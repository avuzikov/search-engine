from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from movie_searcher import Index, SearchResponse

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

search_engine = Index.from_resources('/home/avuzikov/search-engine/backend/resources')

@app.get("/find_film", response_model=SearchResponse)
async def find_film(query: str):
    return search_engine(query)
