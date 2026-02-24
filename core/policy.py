# ===============================
# ACTION EVALUATION
# ===============================

def evaluate_actions(state, battery_level, ev_load, renewable_ratio):

    action_scores = {}

    action_scores["Charge Battery"] = 100 - battery_level
    action_scores["Shift EV Charging"] = ev_load * 2
    action_scores["Local Energy Sharing"] = renewable_ratio * 50
    action_scores["Draw from Grid"] = 50 if state in ["PEAK", "CRITICAL"] else 10

    ranked_actions = sorted(
        action_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return ranked_actions


# ===============================
# EXPLAINER
# ===============================

def explain_decision(state):
    explanations = {
        "SURPLUS": "Solar exceeds demand. Prioritize storage and sharing.",
        "DEFICIT": "Demand exceeds solar. Optimize battery and grid usage.",
        "PEAK": "High load detected. Activate stress-reduction strategy.",
        "CRITICAL": "Critical overload risk. Immediate mitigation required.",
        "NORMAL": "System operating normally."
    }

    return explanations.get(state, "No explanation available.")