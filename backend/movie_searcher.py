import dataclasses
import os
import pandas as pd
import json
import hnswlib

import torch
import typing as tp
import sentence_transformers
from sentence_transformers import util
from pydantic import BaseModel


class SearchResponse(BaseModel):
    minute: int
    second: int
    title: str
    text: str
    def to_json(self):
        return {
            'minute': minute,
            'second': second,
            'name': title,
            'quote': text
        }



class Index:
    def __init__(
            self,
            index: hnswlib.Index,
            movie_db: pd.DataFrame,
            subtitles_db: pd.DataFrame,
            unique_texts: pd.DataFrame,
            model: sentence_transformers.SentenceTransformer
    ):
        self.index = index
        self.movie_db = movie_db
        self.subtitles_db = subtitles_db
        self.unique_texts = unique_texts
        self.model = model




    @classmethod
    def from_resources(cls, resources_folder: str):
        index_filename = os.path.join(resources_folder, 'hnswlib.index')
        movies_meta_filename = os.path.join(resources_folder, 'movies_meta.csv')
        movies_subtitles_filename = os.path.join(resources_folder, 'movies_subtitles.csv')
        unique_texts_filename = os.path.join(resources_folder, 'unique_texts.csv')
        config_filename = os.path.join(resources_folder, 'config.json')

        index = hnswlib.Index(space = 'cosine', dim = 512)
        index.load_index(index_filename)
        print("loaded index")

        movies_subtitles = pd.read_csv(movies_subtitles_filename)
        movies_meta = pd.read_csv(movies_meta_filename)
        movies_subtitles = movies_subtitles.dropna(subset=['text'])
        movies_subtitles = movies_subtitles.drop_duplicates()

        unique_texts = pd.read_csv(unique_texts_filename, sep='\t')
        with open(config_filename, 'r') as fin:
            config = json.load(fin)
            model_slug = config['model_slug']
            model = sentence_transformers.SentenceTransformer(
                'distiluse-base-multilingual-cased-v2',
            )

        return cls(
            index=index,
            movie_db=movies_meta,
            subtitles_db=movies_subtitles,
            unique_texts=unique_texts,
            model=model
        )


    def make_response_by_exact_cite(self, text: str) -> SearchResponse:
        subtitle_row = self.subtitles_db[self.subtitles_db.text == text].iloc[0]
        imdb_id = subtitle_row.imdb_id
        text = subtitle_row.text
        total_seconds = (
            int(subtitle_row.start_time + subtitle_row.end_time) / 2
        )
        minutes = total_seconds // 60
        seconds = total_seconds % 60
        film_name = (
            self.movie_db[self.movie_db.imdb_id == imdb_id].original_title.iloc[0]
        )
        return SearchResponse(
            minute=minutes,
            second=seconds,
            title=film_name,
            text=text
        )

    def find_cite_hnsw(self, text: str):
        query_embedding = self.model.encode(
            [text],
            convert_to_tensor=True,
        )
        indices, similarities = self.index.knn_query(
            data=query_embedding,
            k=1 # TODO make this variable
        )
        return self.unique_texts.iloc[indices[0][0]].text


    def __call__(self, query: str):
        citate = self.find_cite_hnsw(query)
        return self.make_response_by_exact_cite(citate)
