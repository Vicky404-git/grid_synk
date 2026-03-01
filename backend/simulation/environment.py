import numpy as np
import pandas as pd

def generate_environment(hours=24):
    time = np.arange(hours)

    residential = 40 + 20 * np.sin(time / 3)
    industrial = 60 + 5 * np.cos(time / 5)
    ev_load = np.random.uniform(5, 20, hours)

    cloud_factor = np.random.uniform(0.6, 1.0, hours)
    solar = np.maximum(0, 80 * np.sin(time / 4)) * cloud_factor

    demand = residential + industrial + ev_load

    return pd.DataFrame({
        "hour": time,
        "demand": demand,
        "solar": solar
    })