class EnergyState:
    SURPLUS = "SURPLUS"
    DEFICIT = "DEFICIT"
    PEAK = "PEAK"
    NORMAL = "NORMAL"


def detect_state(solar, demand, peak_flag):
    if peak_flag:
        return EnergyState.PEAK
    if solar > demand:
        return EnergyState.SURPLUS
    if solar < demand:
        return EnergyState.DEFICIT
    return EnergyState.NORMAL
