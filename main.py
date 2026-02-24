import streamlit as st
import matplotlib.pyplot as plt
from simulation.sim import generate_data, forecast_next_hour
from core.decision_engine import run_decision

st.title("⚡ Grid-Sync: AI Energy Coordination Prototype")

if st.button("Run Simulation"):

    df = generate_data()

    predicted_solar, predicted_demand, peak_flag = forecast_next_hour(df)

    state, actions, explanation = run_decision(
        predicted_solar,
        predicted_demand,
        peak_flag
    )

    st.subheader("📊 Energy Trends")
    fig, ax = plt.subplots()
    ax.plot(df["hour"], df["solar"], label="Solar Generation")
    ax.plot(df["hour"], df["demand"], label="Energy Demand")
    ax.legend()
    st.pyplot(fig)

    st.subheader("🔮 Forecast (Next Hour)")
    st.write(f"Predicted Solar: {round(predicted_solar,2)} kWh")
    st.write(f"Predicted Demand: {round(predicted_demand,2)} kWh")
    st.write(f"Peak Predicted: {'Yes' if peak_flag else 'No'}")

    st.subheader("🧠 System State")
    st.success(f"Current State: {state}")

    st.subheader("⚙️ Optimization Actions")
    for action in actions:
        st.write(f"- {action}")

    st.subheader("📘 Explanation")
    st.info(explanation)