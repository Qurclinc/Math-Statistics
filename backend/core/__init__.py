from .utils import dataframe_to_list
from .parser import parser

from .describing_statistics import (
    get_power, get_averages, get_medians, get_modas,
    get_mins, get_maxs, get_variation_difference,
    get_dispersions, get_standard_difference,
    get_variation_coeff, get_SE, get_MOE
)

from .normalization import normalize
from .pearson import pearson_criterion
from .correlations import pairwise_correlations, partial_correlations
from .regression import get_regression, get_metrics