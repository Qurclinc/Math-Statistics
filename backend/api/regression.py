import math
from fastapi import APIRouter
import numpy as np
from scipy import stats

from core import (
    parser, get_regression, get_metrics, dataframe_to_list
)

router = APIRouter()

def to_native(val):
    """Преобразует numpy-типы в нативные Python-типы"""
    if isinstance(val, (np.integer,)):
        return int(val)
    elif isinstance(val, (np.floating,)):
        return float(val)
    elif isinstance(val, np.ndarray):
        return val.tolist()
    elif isinstance(val, (np.bool_,)):
        return "Н/З" if bool(val) == False else "Значим"
    return val

@router.get("/regression")
async def regression():
    header = parser.header[1:]
    beta, predicted_Y, residuals, RSS, TSS, cov_beta, n, k, Y = get_regression(header, parser.data)
    R2, R2_adj, F_obs, p_f, F_crit = get_metrics(RSS, TSS, n, k)
    
    std_errors = np.sqrt(np.diag(cov_beta))
    t_stats = beta / std_errors
    p_values = [2 * (1 - stats.t.cdf(abs(t), n-k-1)) for t in t_stats]
    mape = np.mean(np.abs(residuals / Y)) * 100
    
    # Явно преобразуем каждый элемент
    data = []
    for i in range(len(beta)):
        data.append([
            to_native(beta[i]),
            to_native(std_errors[i]),
            to_native(t_stats[i]),
            to_native(p_values[i]),
            to_native(p_values[i] < 0.05)  # bool → нативный bool
        ])
    
    return {
        "header": ["Переменная", "Коэффициент β", "Стандартная ошибка", "t-статистика", "p-уровень", "Значимость"],
        "signs": header,
        "data": data,
        "predicted_Y": to_native(predicted_Y),
        "actual_Y": to_native(Y),
        "resid": to_native(residuals),
        "R2": to_native(R2),
        "R2_abj": to_native(R2_adj),
        "F_obs": to_native(F_obs),
        "p_f": to_native(p_f),
        "mape": to_native(mape)
    }