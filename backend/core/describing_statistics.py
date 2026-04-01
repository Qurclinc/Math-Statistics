import math
from typing import List, Any

def get_power(header: List[str], data: List[List[int | float]]):
    result = []
    for i in range(len(header)):
        counter = 0
        for j, value in enumerate(data):
            counter += 1
        result.append(counter)
        
    return result

def get_averages(header: List[str], data: List[List[int | float]]):
    result = []
    for i in range(len(header)):
        middle = []
        for j, value in enumerate(data):
            middle.append(data[j][i])
        result.append(round(sum(middle) / len(middle), 2))
        
    return result

def get_medians(header: List[str], data: List[List[int | float]]):
    result = []
    for i in range(len(header)):
        values = []
        for j, value in enumerate(data):
            values.append(data[j][i])
        values.sort()
        
        n = len(values)
        if n % 2 == 0:
            median = (values[(n - 1) // 2] + values[((n - 1) // 2) + 1]) / 2
        else:
            median = (values[(n) // 2])
        result.append(round(median, 2))
        
    return result

def get_modas(header: List[str], data: List[List[int | float]]):
    result = []
    for i in range(len(header)):
        dict = {}
        values = []
        for j, value in enumerate(data):
            values.append(data[j][i])
        for value in set(values):
            dict[value] = values.count(value)
        max_entry = max(dict.items(), key=lambda x: (x[1], x[0]))
        if max_entry[1] == 1:
            result.append("N/A")
        else:
            result.append(max_entry[0])
        
    return result

def get_mins(header: List[str], data: List[List[int | float]]):
    result = []
    for i in range(len(header)):
        values = []
        for j, value in enumerate(data):
            values.append(data[j][i])
        result.append(min(values))
        
    return result

def get_maxs(header: List[str], data: List[List[int | float]]):
    result = []
    for i in range(len(header)):
        values = []
        for j, value in enumerate(data):
            values.append(data[j][i])
        result.append(max(values))
        
    return result

def get_variation_difference(mins: List[float], maxs: List[float]):
    if len(mins) != len(maxs):
        raise IndexError
    result = []
    for i in range(len(mins)):
        result.append(maxs[i] - mins[i])
        
    return result

def get_dispersions(
    header: List[str],
    data: List[List[int | float]],
    averages: List[float]
):
    result = []
    for i in range(len(header)):
        values = []
        for j, value in enumerate(data):
            values.append(data[j][i])
        
        tmp = []
        for value in values:
            tmp.append((value - averages[i]) ** 2)
        result.append(round(sum(tmp) / (len(data) - 1), 3))
    return result

def get_standard_difference(dispersions: List[float]):
    return [round(math.sqrt(dispersion), 3) for dispersion in dispersions]

def get_variation_coeff(
    standard_differences: List[float],
    averages: List[float]
):
    if len(standard_differences) != len(averages):
        raise IndexError
    
    result = []
    for i in range(len(averages)):
        result.append(round((standard_differences[i] / averages[i]) * 100))
        
    return result

def get_SE(
    standard_differences: List[float],
    powers: List[int]
):
    if len(standard_differences) != len(powers):
        raise IndexError
    
    result = []
    for i in range(len(standard_differences)):
        result.append(round(standard_differences[i] / math.sqrt(powers[i]), 3))
        
    return result

def get_MOE(SEs: List[float]):
    STATIC_COEF = 1.96
    return [round(STATIC_COEF * se, 3) for se in SEs]