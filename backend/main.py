from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.decision_engine import EnergyDecisionEngine
from simulation.sim import run_simulation

app = FastAPI()
engine = EnergyDecisionEngine()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/decision")
def get_decision(battery: float, ev: float):

    sim = run_simulation()

    result = engine.evaluate(
        solar=sim["solar"],
        demand=sim["demand"],
        battery_level=battery,
        ev_load=ev
    )

    result["event"] = sim["peak_event"]

    return result