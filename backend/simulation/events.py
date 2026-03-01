import random

def inject_event(demand):
    if random.random() < 0.2:
        return demand + 30, "Festival Spike"
    return demand, None