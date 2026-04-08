from fastapi import APIRouter
from core import (
    parser, dataframe_to_list, pairwise_correlations, partial_correlations,
    normalize
)

router = APIRouter()

@router.get("/pairwise_correlation")
async def get_normalized_data():
    header = parser.header[1:]
    matrix, t_matrix, t_crit = pairwise_correlations(
        header,
        normalize(header, parser.data)
    )
    # print(matrix)
    return {
        "header": header,
        "signs": header,
        "matrix": list(map(list, zip(*dataframe_to_list(matrix)))),
        "t_matrix": list(map(list, zip(*dataframe_to_list(t_matrix)))),
        "t_crit": round(t_crit, 3)
    }
    
@router.get("/partial_correlation")
async def get_normalized_data():
    matrix, t_matrix, t_crit = partial_correlations(
        parser.header[1:],
        parser.data
    )
    return {
        "header": parser.header,
        "signs": parser.header[1:],
        "matrix": list(map(list, zip(*dataframe_to_list(matrix)))),
        "t_matrix": list(map(list, zip(*dataframe_to_list(t_matrix)))),
        "t_crit": round(t_crit, 3)
    }