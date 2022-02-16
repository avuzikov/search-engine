from fastapi import FastAPI
from movie_searcher import Index, SearchResponse

app = FastAPI()
search_engine = Index.from_resources('./resources')

@app.get("/find_film", response_model=SearchResponse)
async def find_film(query: str):
    return search_engine(query)
