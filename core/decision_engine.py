from core.states import detect_state
from core.optimizer import optimize
from core.explain import explain_decision


def run_decision(solar, demand, peak_flag):
    state = detect_state(solar, demand, peak_flag)
    actions = optimize(state)
    explanation = explain_decision(state)
    return state, actions, explanation