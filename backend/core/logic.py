# ===============================
# METRICS
# ===============================

def compute_stress_index(solar, demand):
    return demand - solar


def compute_renewable_ratio(solar, demand):
    if demand == 0:
        return 1
    return solar / demand


# ===============================
# STATES
# ===============================

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


# ===============================
# TRANSITION
# ===============================

class TransitionTracker:
    def __init__(self):
        self.previous_state = None

    def track(self, current_state):
        transition = (self.previous_state, current_state)
        self.previous_state = current_state
        return transition