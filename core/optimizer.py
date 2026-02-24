def optimize(state):
    if state == "SURPLUS":
        return [
            "Charge Battery",
            "Share Energy Locally",
            "Support EV Charging",
            "Export Surplus to Grid"
        ]

    elif state == "DEFICIT":
        return [
            "Use Battery Storage",
            "Request Local Sharing",
            "Draw from Main Grid"
        ]

    elif state == "PEAK":
        return [
            "Shift EV Charging to Off-Peak",
            "Reduce Non-Essential Loads",
            "Maximize Local Renewable Usage"
        ]

    return ["System Operating Normally"]