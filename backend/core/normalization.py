from typing import  List
from .describing_statistics import get_variation_difference, get_mins, get_maxs

def normalize(
    header: List[str],
    data: List[List[float | int]],
):
    mins = get_mins(header, data)
    maxs = get_maxs(header, data)
    kv = get_variation_difference(mins, maxs)
    
    result = []
    for i in range(len(header)):
        line = []
        for j in range(len(data)):
            value = data[j][i]
            stat = (value - mins[i]) / kv[i]
            line.append(round(stat, 3))
        result.append(line)
    return result