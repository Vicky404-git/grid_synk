# core/transition.py

class TransitionTracker:
    def __init__(self):
        self.previous_state = None

    def track(self, current_state):
        transition = (self.previous_state, current_state)
        self.previous_state = current_state
        return transition