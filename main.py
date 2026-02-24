import streamlit as st
import matplotlib.pyplot as plt
from simulation.sim import generate_data, forecast_next_hour
from core.decision_engine import EnergyDecisionEngine

st.set_page_config(layout="wide")

st.title("⚡ Grid-Sync: Advanced AI Energy Coordination Engine")

engine = EnergyDecisionEngine()

if st.button("Run Simulation"):

    df = generate_data()

    predicted_solar, predicted_demand, peak_flag = forecast_next_hour(df)

    # Simulated extra inputs for advanced engine
    battery_level = 60  # %
    ev_load = 25        # kWh demand

    result = engine.evaluate(
        solar=predicted_solar,
        demand=predicted_demand,
        battery_level=battery_level,
        ev_load=ev_load
    )

    col1, col2 = st.columns(2)

    with col1:
        st.subheader("📊 Energy Trends")
        fig, ax = plt.subplots()
        ax.plot(df["hour"], df["solar"], label="Solar Generation")
        ax.plot(df["hour"], df["demand"], label="Energy Demand")
        ax.legend()
        st.pyplot(fig)

    with col2:
        st.subheader("🔮 Forecast (Next Hour)")
        st.write(f"Predicted Solar: {round(predicted_solar,2)} kWh")
        st.write(f"Predicted Demand: {round(predicted_demand,2)} kWh")
        st.write(f"Battery Level: {battery_level}%")
        st.write(f"EV Load: {ev_load} kWh")

    st.markdown("---")

    st.subheader("🧠 AI System Analysis")

    st.metric("Grid Stress Index", round(result["stress_index"], 2))
    st.metric("Renewable Utilization Ratio", round(result["renewable_ratio"], 2))

    st.success(f"Current State: {result['state']}")
    st.write(f"State Transition: {result['transition']}")

    st.markdown("---")

    st.subheader("⚙️ Ranked Optimization Actions")

    for action, score in result["ranked_actions"]:
        st.write(f"**{action}** → Score: {round(score,2)}")
