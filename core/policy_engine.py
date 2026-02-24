# core/policy_engine.py

def evaluate_actions(state, battery_level, ev_load, renewable_ratio):

    action_scores = {}

    # Charge battery
    action_scores["Charge Battery"] = 100 - battery_level

    # EV shift
    action_scores["Shift EV Charging"] = ev_load * 2

    # Share locally
    action_scores["Local Energy Sharing"] = renewable_ratio * 50

    # Grid draw
    action_scores["Draw from Grid"] = 50 if state in ["PEAK", "CRITICAL"] else 10

    # Sort actions by score descending
    ranked_actions = sorted(action_scores.items(), key=lambda x: x[1], reverse=True)

    return ranked_actions