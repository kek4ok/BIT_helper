from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from pydantic import BaseModel
from question import answer_to_question


class Item(BaseModel):
    question: str
    user_id: int
    question_id: int



app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Api status": "UP"}


@app.post("/questions_send")
async def create_item(item: Item):
    answer = answer_to_question(item.question)
    return JSONResponse({"data": {
        'question_id': item.question_id,
        'answer': answer
    }})
