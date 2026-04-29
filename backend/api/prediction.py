from typing import Dict
from fastapi import APIRouter, HTTPException

from core import (
    parser, make_prediction
)

router = APIRouter()

@router.post("/prediction")
async def get_prediction(input: Dict[str, str]):
    input_values = list(input.values())
    header = parser.header[1:]
    if len(input_values) != len(header)- 1:
        raise HTTPException(400, "Пропущены некоторые числа")
    try:
        result = make_prediction()
    except TypeError:
        raise HTTPException(400, "Вводите только числа")
    
    return {"reult": result}