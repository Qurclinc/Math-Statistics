from fastapi import APIRouter, HTTPException

from core import parser
from core.describing_statistics import (
    get_power, get_averages, get_medians, get_modas,
    get_maxs, get_mins, get_variation_difference,
    get_dispersions, get_standard_difference,
    get_variation_coeff, get_SE, get_MOE
)

router = APIRouter()

@router.get("/describing_statistics")
async def get_describing_statistics():
    header = parser.header[1:]
    signs = [
        "n\n(мощность)", "Mx\n(выборочное среднее)", "Me\n(медиана)", "Mo(мода)", "min",
        "max", "V\n(размах вариации)", "D\n(дисперсия)", "S\n(стандартное отклонение)",
        "Kv\n(коэффициент вариации)", "SE", "MOE"
    ]
    data = []
    response = {}
    try:
        powers = get_power(header, parser.data)
        data.append(list(map(str, powers)))

        averages = get_averages(header, parser.data)
        data.append(list(map(str, averages)))

        medians = get_medians(header, parser.data)
        data.append(list(map(str, medians)))

        modas = get_modas(header, parser.data)
        data.append(list(map(str, modas)))

        mins = get_mins(header, parser.data)
        data.append(list(map(str, mins)))

        maxs = get_maxs(header, parser.data)
        data.append(list(map(str, maxs)))

        variation_differences = get_variation_difference(mins, maxs)
        data.append(list(map(str, variation_differences)))

        dispersions = get_dispersions(header, parser.data, averages)
        data.append(list(map(str, dispersions)))

        standard_differences = get_standard_difference(dispersions)
        data.append(list(map(str, standard_differences)))

        variation_coeff = get_variation_coeff(standard_differences, averages)
        data.append(list(map(str, variation_coeff)))

        SEs = get_SE(standard_differences, powers)
        data.append(list(map(str, SEs)))

        MOEs = get_MOE(SEs)
        data.append(list(map(str, MOEs)))
        
        response["header"] = [""] + header
        response["signs"] = signs
        response["data"] = data
    except Exception as ex:
        print(str(ex))
        raise HTTPException(400, "Неверно импортирован файл")
    return response