from sklearn.linear_model import LinearRegression
import numpy as np

def forecast_next_hour(df):
    X = df[["hour"]]

    model_demand = LinearRegression()
    model_demand.fit(X, df["demand"])

    model_solar = LinearRegression()
    model_solar.fit(X, df["solar"])

    next_hour = np.array([[df["hour"].iloc[-1] + 1]])

    predicted_demand = model_demand.predict(next_hour)[0]
    predicted_solar = model_solar.predict(next_hour)[0]

    peak = predicted_demand > 120

    return predicted_solar, predicted_demand, peak