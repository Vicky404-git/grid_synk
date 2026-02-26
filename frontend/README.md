# Grid-Sync – Smart Energy Management System (Frontend)

A modern, AI-powered energy dashboard for monitoring and managing solar, battery, EV charging, and grid energy.

![Grid-Sync Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) ![Vite](https://img.shields.io/badge/Vite-7.x-646CFF) ![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384)

## 🚀 How to Run

### Prerequisites
- **Node.js** (v18 or higher) – [Download here](https://nodejs.org/)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Vicky404-git/grid_synk.git

# 2. Go into the frontend folder
cd grid_synk/frontend

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

The app will open at **http://localhost:5173/** (or the next available port).

## 📁 Project Structure

```
frontend/
├── index.html       # Dashboard layout with all 7 modules
├── style.css        # Design system (light/dark themes, animations)
├── main.js          # Charts, routing, live data, interactive controls
├── package.json     # Dependencies (Chart.js)
└── public/
    └── vite.svg     # Vite icon
```

## 📊 Modules

| Module | Features |
|--------|----------|
| **Overview** | Real-time energy cards, live energy flow visualization |
| **Solar** | Production chart, weather forecast, fault alerts |
| **Battery** | Animated battery indicator, smart charging controls |
| **EV Charging** | Charging animation, Fast/Eco/Solar modes |
| **Trading** | Buy vs Sell chart, trading history, auto-trade |
| **Analytics** | Solar vs Demand, savings, energy source comparison |
| **Settings** | Account, energy preferences, notifications, system |

## 🎨 Features

- ☀️ Light & 🌙 Dark mode
- 📱 Responsive mobile layout
- 📈 Interactive Chart.js graphs
- ⚡ Simulated live data updates
- 🎯 Smooth animations & transitions

## 🛠️ Tech Stack

- **Vite** – Build tool
- **Vanilla JS** – No framework dependencies
- **Chart.js** – Data visualization
- **CSS Custom Properties** – Theming

## 👥 Team

Grid-Sync – Smart Energy Management System
