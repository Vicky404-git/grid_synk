from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.decision_engine import EnergyDecisionEngine
from simulation.sim import generate_data, forecast_next_hour

app = FastAPI()
engine = EnergyDecisionEngine()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/decision")
def get_decision(
    battery: float,
    ev: float
):
    df = generate_data()
    predicted_solar, predicted_demand, peak_flag = forecast_next_hour(df)

    result = engine.evaluate(
        solar=predicted_solar,
        demand=predicted_demand,
        battery_level=battery,
        ev_load=ev
    )

    result["forecast_peak"] = peak_flag

    return result