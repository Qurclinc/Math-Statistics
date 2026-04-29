from fastapi import APIRouter
from core import parser, normalize

router = APIRouter()

from core import pearson_criterion

@router.get("/pearson")
async def get_pearson_criterion():
    data = list(map(list, zip(*parser.data)))
    raw_data = {key: value for key, value in zip(parser.header[1:], data)}
    return {
        "header": ["Параметр", "χ² набл.", "χ² крит.", "df", "p", "Вердикт"],
        "signs": parser.header[1:],
        "data": pearson_criterion(data),
        "raw_data": raw_data
    }