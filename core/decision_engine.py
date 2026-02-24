# core/decision_engine.py

from core.metrics import compute_stress_index, compute_renewable_ratio
from core.states import classify_state
from core.policy_engine import evaluate_actions
from core.transition import TransitionTracker


class EnergyDecisionEngine:

    def __init__(self):
        self.transition_tracker = TransitionTracker()

    def evaluate(self, solar, demand, battery_level, ev_load):

        stress_index = compute_stress_index(solar, demand)
        renewable_ratio = compute_renewable_ratio(solar, demand)

        state = classify_state(stress_index)
        transition = self.transition_tracker.track(state)

        ranked_actions = evaluate_actions(
            state,
            battery_level,
            ev_load,
            renewable_ratio
        )

        return {
            "state": state,
            "stress_index": stress_index,
            "renewable_ratio": renewable_ratio,
            "transition": transition,
            "ranked_actions": ranked_actions
        }