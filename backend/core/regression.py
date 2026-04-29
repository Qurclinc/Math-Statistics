from typing import List

import numpy as np
import pandas as pd
from scipy import stats

def get_regression_matrix(
    header: List[str],
    data: List[List[int | float]]
):
    # df = pd.DataFrame({k: v for k, v in zip(header, data) })
    df = pd.DataFrame(data, columns=header)
    Y = df.iloc[:, -1].values
    X = df.iloc[:, :-1].values
    
    ones = np.ones((X.shape[0], 1))
    X = np.hstack([ones, X])
    signs = ["Свободный член (beta0)"] + df.columns[:-1].tolist()
    return X, Y, signs

def get_metrics(RSS, TSS, n, k):
    R2 = 1 - (RSS / TSS)
    R2_adj = 1 - (1 - R2) * (n - 1)/ (n - k - 1)
    
    F_obs = (R2 / k) / ((1 - R2) / (n - k - 1))
    p_f = 1 - stats.f.cdf(F_obs, k, n - k - 1)
    F_crit = stats.f.ppf(0.95, k, n - k - 1)
    
    return R2, R2_adj, F_obs, p_f, F_crit

def get_regression(
    header: List[str],
    data: List[List[int | float]]
):
    X, Y, _ = get_regression_matrix(header, data)
    XTX = X.T @ X
    try:
        inv_XTX = np.linalg.inv(XTX)
    except np.linalg.LinAlgError:
        inv_XTX = np.linalg.pinv(XTX)
        
    beta = inv_XTX @ X.T @ Y
    predicted_Y = X @ beta
    residuals = Y - predicted_Y
    
    n, k = X.shape
    k -= 1
    
    RSS = np.sum(residuals ** 2)
    TSS = np.sum((Y - np.mean(Y)) ** 2)
    
    s2 = RSS / (n - k - 1)
    cov_beta = s2 * inv_XTX
    
    return beta, predicted_Y, residuals, RSS, TSS, cov_beta, n, k, Y

