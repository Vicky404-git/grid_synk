def explain_decision(state):
    explanations = {
        "SURPLUS": "Solar generation exceeds demand. System prioritizes storage and sharing.",
        "DEFICIT": "Demand exceeds solar generation. System optimizes battery and grid usage.",
        "PEAK": "Peak load predicted. System activates stress-reduction strategies.",
        "NORMAL": "Energy supply and demand are balanced."
    }
    return explanations.get(state, "No explanation available.")