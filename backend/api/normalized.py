from fastapi import APIRouter
from core import parser, normalize

router = APIRouter()

@router.get("/normalized")
async def get_normalized_data():
    return {
        "header": parser.header,
        "signs": parser.signs,
        "data": list(map(list, zip(*normalize(parser.header[1:], parser.data))))
    }