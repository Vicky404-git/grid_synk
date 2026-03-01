from simulation.environment import generate_environment
from simulation.forecast import forecast_next_hour
from simulation.events import inject_event

def run_simulation():
    df = generate_environment()
    predicted_solar, predicted_demand, peak = forecast_next_hour(df)

    predicted_demand, event = inject_event(predicted_demand)

    return {
        "solar": predicted_solar,
        "demand": predicted_demand,
        "peak_event": event,
        "peak_flag": peak
    }