import math
from fastapi import APIRouter
import numpy as np
from scipy import stats

from core import (
    parser, get_regression, get_metrics, dataframe_to_list
)

router = APIRouter()

@router.get("/regression")
async def regression():
    header = parser.header[1:]
    beta, predicted_Y, residuals, RSS, TSS, cov_beta, n, k, Y = get_regression(header, parser.data)
    R2, R2_adj, F_obs, p_f, F_crit = get_metrics(RSS, TSS, n, k)
    
    std_errors = np.sqrt(np.diag(cov_beta))        # Std.Error — корень из диагонали
    t_stats = beta / std_errors                    # t-статистика
    p_values = [2 * (1 - stats.t.cdf(abs(t), n-k-1)) for t in t_stats]  # p-value
    mape = np.mean(np.abs(residuals / Y)) * 100
    
    data = [
        [beta[i], t_stats[i], p_values[i], p_values[i] < 0.05]
        for i in range(len(beta))
    ]
    
    return {
        "header": ["Переменная", "Коэффициент β", "Стандартная ошибка", "t-stat", "p-value", "Значимость"],
        "signs": parser.signs,
        "data": data,
        "predicted_Y": predicted_Y,
        "resid": residuals,
        "R2": R2,
        "R2_abj": R2_adj,
        "F_obs": F_obs,
        "p_f": p_f,
        "mape": mape
    }