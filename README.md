Built with FastAPI + AI Forecasting + Policy Engine
# ⚡ Grid-Sync

AI-Powered Microgrid Energy Forecasting & Coordination Engine

## 🚀 Overview

Grid-Sync is an AI-driven microgrid coordination system that:
- Forecasts energy demand and solar generation
- Computes real-time grid stress index
- Detects system states (Surplus / Normal / Peak / Critical)
- Ranks optimal energy actions
- Integrates weather-aware solar modeling
- Provides explainable AI decisions

Built for AMD Slingshot Hackathon.

## 🧠 Core Intelligence
# 1️⃣ Forecasting Engine
- Synthetic + weather-adjusted simulation
- Linear regression-based demand forecasting
- Solar prediction modeling

# 2️⃣ Grid Stress Index
Custom AI metric combining:
- Demand vs generation imbalance
- Battery level
- EV load
- Renewable utilization ratio

# 3️⃣ Policy Engine
Ranks actions dynamically:
- Charge Battery
- Shift EV Charging
- Local Energy Sharing
- Draw from Grid

## 🏗 Architecture
```
Weather API
     ↓
Simulation Engine
     ↓
Forecasting Model
     ↓
AI Decision Engine
     ↓
FastAPI Backend
     ↓
Frontend Dashboard
```

## 🛠 Tech Stack

**Backend:**
- FastAPI
- NumPy
- Pandas
- scikit-learn

**Frontend:**
- HTML / CSS / JS
- Fetch API

## ⚙️ Run Locally
### Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Open:
```
http://127.0.0.1:8000/docs
```
### Frontend

Open index.html in browser
(or run using Vite if configured)

## 📊 Example Output
- Grid Stress Index: -43.66
- Renewable Utilization: 1.9
- State: SURPLUS
- Ranked Actions:
- - Local Energy Sharing
- - Shift EV Charging
- - Charge Battery
- - Draw from Grid

## 🎯 Hackathon Focus
- Sustainable AI
- Smart Cities
- AI for Energy Optimization
- Real-Time Decision Systems

## 🔮 Future Scope
- Real weather API integration
- Multi-node microgrid simulation
- Reinforcement Learning optimization
- Carbon emission scoring
- Digital twin modeling

## 👥 Team Structure
- AI & Core Logic Lead
- Simulation & Forecasting Lead
- Frontend & Visualization Lead