# core/metrics.py

def compute_stress_index(solar, demand):
    return demand - solar


def compute_renewable_ratio(solar, demand):
    if demand == 0:
        return 1
    return solar / demand