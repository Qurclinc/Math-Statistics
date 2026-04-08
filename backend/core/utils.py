import pandas as pd

def dataframe_to_list(
    df: pd.DataFrame
):
    n, m = df.shape
    result = []
    for i in range(n):
        tmp = []
        for j in range(m):
            value = df.iloc[i, j]
            tmp.append(float(round(value, 4)))
        result.append(tmp)
    return result