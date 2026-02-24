# core/states.py

class EnergyState:
    SURPLUS = "SURPLUS"
    DEFICIT = "DEFICIT"
    PEAK = "PEAK"
    CRITICAL = "CRITICAL"
    NORMAL = "NORMAL"


def classify_state(stress_index):
    if stress_index > 40:
        return EnergyState.CRITICAL
    elif stress_index > 20:
        return EnergyState.PEAK
    elif stress_index > 0:
        return EnergyState.DEFICIT
    elif stress_index < -10:
        return EnergyState.SURPLUS
    return EnergyState.NORMAL