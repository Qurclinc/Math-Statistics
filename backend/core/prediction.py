from typing import List
from .regression import get_regression

def make_prediction(
    header: List[str],
    data: List[List[int | float]],
    input_values: List[int | float]
    ):
    try:
        input_values = list(map(float, input_values))
    except TypeError:
        raise TypeError
    beta, _, _, _, _, _, _, _, _ = get_regression(header, data)
    y_pred = beta[0]
    for i in range(len(input_values)):
        y_pred += input_values[i] * beta[i + 1]
        
    return round(y_pred, 4)