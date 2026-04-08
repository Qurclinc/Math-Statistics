from typing import List
import numpy as np
import pandas as pd
from scipy import stats

def pairwise_correlations(
    header: List[str],
    data: List[List[int | float]],
    alpha: float = 0.05
):
    df = pd.DataFrame({k: v for k, v in zip(header, data) })
    n = len(df)
    m = df.shape[1]
    cols = df.columns
    
    matrix = df.corr(method="pearson").fillna(0).clip(-1.0, 1.0)
    t_obs_matrix = pd.DataFrame(np.zeros((m, m)), index=cols, columns=cols)
    
    df_degrees = n - 2
    t_crit = stats.t.ppf(1 - alpha / 2, df_degrees)
    
    for i in range(m):
        for j in range(m):
            if i == j: continue
            r = matrix.iloc[i, j]
            
            denominator = np.sqrt(max(0, 1 - r ** 2))
            if denominator < 10 ** -10:
                t_value = 100.0
            else:
                t_value = r * np.sqrt(df_degrees / (1 - r ** 2 + 10 ** -15))
            t_obs_matrix.iloc[i, j] = t_value
            
    return matrix, t_obs_matrix, t_crit


def partial_correlations(
    header: List[str],
    data: List[List[int | float]],
    alpha: float = 0.05
):
    df = pd.DataFrame({k: v for k, v in zip(header, data) })
    n, m = df.shape
    cols = df.cols
    C = df.cov() + np.eye(m) * 10 ** -6
    P = np.linalg.inv(C)
    r_part = np.zeros((m, m))
    t_obs_matrix = pd.DataFrame(np.zeros(m, m), index=cols, columns=cols)
    
    df_degrees = n - m
    t_crit = stats.t.ppf(1 - alpha / 2, df_degrees)
    
    for i in range(m):
        for j in range(m):
            if i == j:
                r_part[i, j] = 1.0
            else:
                denominator = np.sqrt(max(10 ** -15, P[i, i] * P[j, j]))
                result = -P[i, j] / denominator
                r_part[i, j] = np.clip(result, -1.0, 1.0)
                
    r_df = pd.DataFrame(r_part, index=cols, columns=cols)
    
    for i in range(m):
        for j in range(m):
            if i != j:
                r = r_df.iloc[i, j]
                denominator = np.sqrt(max(10 ** -15, 1 - r ** 2))
                t_value = r * np.sqrt(df_degrees) / denominator
                t_obs_matrix.iloc[i, j] = t_value
                
    return r_df, t_obs_matrix, t_crit