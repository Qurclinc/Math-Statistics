import numpy as np
from scipy import stats
from typing import List

def pearson_criterion(data: List[List[int | float]]):
    result = []
    for line in data:
        line = np.array(line)
        n = len(line)
        
        k = int(1 + np.floor(3.322 * np.log10(n)))
        if k < 5: k = 5

        counts, bins = np.histogram(line, bins=k)
        mean, std = line.mean(), line.std()
        
        expected = []
        for i in range(len(bins)-1):
            p = stats.norm.cdf(bins[i+1], mean, std) - stats.norm.cdf(bins[i], mean, std)
            expected.append(p * n)
        
        expected = np.array(expected)
        # Адаптация для суммы (нормализация)
        expected = expected * (counts.sum() / expected.sum())
        
        # Расчет Хи-квадрат (эмпирический)
        chi_sq_obs, _ = stats.chisquare(counts, expected, ddof=2)
        df_deg = k - 3
        
        # НОВОЕ: Расчет критического Хи-квадрат для alpha = 0.05
        # Если df_deg <= 0 (мало данных), берем 1, чтобы не упало
        if df_deg > 0:
            chi_sq_crit = stats.chi2.ppf(0.95, df_deg)
            p_value = 1 - stats.chi2.cdf(chi_sq_obs, df_deg)
        else:
            chi_sq_crit = np.nan
            p_value = 0.0
        
        verdict = "нормальное" if p_value > 0.05 else "не нормальное"
        
        result.append([
            round(chi_sq_obs, 4),
            round(chi_sq_crit, 4),
            df_deg,
            round(p_value, 4),
            verdict
        ])
    return result