import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression


def generate_data(hours=24):
    np.random.seed(42)

    time = np.arange(hours)

    solar = np.clip(50 * np.sin(time / 3) + 50 + np.random.normal(0, 5, hours), 0, None)
    demand = 60 + 10 * np.sin(time / 4) + np.random.normal(0, 5, hours)

    df = pd.DataFrame({
        "hour": time,
        "solar": solar,
        "demand": demand
    })

    return df


def forecast_next_hour(df):
    X = df[["hour"]]
    y_demand = df["demand"]

    model = LinearRegression()
    model.fit(X, y_demand)

    next_hour = [[df["hour"].max() + 1]]
    predicted_demand = model.predict(next_hour)[0]

    predicted_solar = df["solar"].iloc[-1]  # simple carry-forward

    peak_flag = predicted_demand > df["demand"].mean() + 10

    return predicted_solar, predicted_demand, peak_flag