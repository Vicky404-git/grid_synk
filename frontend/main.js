/* ═══════════════════════════════════════════════════════
   GRID-SYNC  –  Main Application Logic
   ═══════════════════════════════════════════════════════ */

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// ── DOM References ──
const sidebar      = document.getElementById('sidebar');
const hamburger    = document.getElementById('hamburger');
const sidebarClose = document.getElementById('sidebarClose');
const overlay      = document.getElementById('overlay');
const themeToggle  = document.getElementById('themeToggle');
const topThemeToggle = document.getElementById('topThemeToggle');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const navItems     = document.querySelectorAll('.nav-item');
const pages        = document.querySelectorAll('.page');

// ── State ──
let currentPage = 'overview';
let chartsInitialized = false;

// ═══════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = item.dataset.page;
    if (page === currentPage) return;
    switchPage(page);
    // Close sidebar on mobile
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
});

function switchPage(page) {
  currentPage = page;
  // Update nav
  navItems.forEach(n => n.classList.toggle('active', n.dataset.page === page));
  // Update pages
  pages.forEach(p => {
    p.classList.toggle('active', p.id === `page-${page}`);
  });
  // Initialize charts when first visiting relevant pages
  if (!chartsInitialized) {
    chartsInitialized = true;
    requestAnimationFrame(() => initAllCharts());
  }
}

// ═══════════════════════════════════════
//  MOBILE SIDEBAR
// ═══════════════════════════════════════
hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
});
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// ═══════════════════════════════════════
//  THEME TOGGLE
// ═══════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  // Update label
  const label = document.querySelector('.theme-label');
  if (label) label.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  // Sync settings switch
  if (darkModeSwitch) darkModeSwitch.checked = !isDark;
  // Update charts colors
  updateChartsTheme();
  localStorage.setItem('grid-sync-theme', isDark ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);
topThemeToggle.addEventListener('click', toggleTheme);
if (darkModeSwitch) {
  darkModeSwitch.addEventListener('change', toggleTheme);
}

// Restore saved theme
const savedTheme = localStorage.getItem('grid-sync-theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  const label = document.querySelector('.theme-label');
  if (label) label.textContent = 'Dark Mode';
  if (darkModeSwitch) darkModeSwitch.checked = true;
}

// ═══════════════════════════════════════
//  INTERACTIVE CONTROLS
// ═══════════════════════════════════════

// Range sliders
document.querySelectorAll('input[type="range"]').forEach(range => {
  const valueSpan = range.parentElement.querySelector('.range-value');
  if (!valueSpan) return;
  range.addEventListener('input', () => {
    valueSpan.textContent = range.value + '%';
  });
});

// Mode selector buttons
document.querySelectorAll('.mode-selector').forEach(selector => {
  selector.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selector.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

// Toggle group buttons (solar daily/weekly/monthly)
document.querySelectorAll('.toggle-group').forEach(group => {
  group.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Update solar chart data based on range
      if (btn.dataset.range && solarChartInstance) {
        updateSolarChart(btn.dataset.range);
      }
    });
  });
});

// ═══════════════════════════════════════
//  CHART.JS – INITIALIZATION
// ═══════════════════════════════════════

let solarChartInstance, tradingChartInstance;
let analyticsChart1, analyticsChart2, analyticsChart3, analyticsChart4;

function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    text: isDark ? '#8b93a7' : '#718096',
    grid: isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)',
    bg: isDark ? '#1c1f2e' : '#ffffff',
  };
}

function baseChartOptions(c) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: c.text, font: { family: "'Inter', sans-serif", size: 12 }, boxWidth: 14, padding: 16 } },
    },
    scales: {
      x: { ticks: { color: c.text, font: { size: 11 } }, grid: { color: c.grid } },
      y: { ticks: { color: c.text, font: { size: 11 } }, grid: { color: c.grid } },
    },
  };
}

function initAllCharts() {
  const c = getChartColors();

  // ── Solar Chart ──
  const solarCtx = document.getElementById('solarChart');
  if (solarCtx) {
    solarChartInstance = new Chart(solarCtx, {
      type: 'line',
      data: {
        labels: ['6 AM','8 AM','10 AM','12 PM','2 PM','4 PM','6 PM'],
        datasets: [{
          label: 'Solar Production (kW)',
          data: [0.5, 2.1, 3.8, 4.8, 4.5, 3.2, 1.1],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245,158,11,.12)',
          fill: true,
          tension: .45,
          pointBackgroundColor: '#f59e0b',
          pointRadius: 4,
          pointHoverRadius: 7,
          borderWidth: 3,
        }]
      },
      options: baseChartOptions(c),
    });
  }

  // ── Trading Chart ──
  const tradingCtx = document.getElementById('tradingChart');
  if (tradingCtx) {
    tradingChartInstance = new Chart(tradingCtx, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [
          { label: 'Bought (kWh)', data: [110,120,95,130,115,120], backgroundColor: 'rgba(0,114,255,.7)', borderRadius: 6 },
          { label: 'Sold (kWh)', data: [60,85,90,75,95,85], backgroundColor: 'rgba(0,201,167,.7)', borderRadius: 6 },
        ]
      },
      options: baseChartOptions(c),
    });
  }

  // ── Analytics Charts ──
  const a1 = document.getElementById('analyticsChart1');
  if (a1) {
    analyticsChart1 = new Chart(a1, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          { label: 'Solar (kWh)', data: [90,105,130,160,180,195,200,185,155,125,100,88], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,.08)', fill: true, tension: .4, borderWidth: 2.5, pointRadius: 3 },
          { label: 'Demand (kWh)', data: [120,115,110,100,95,105,120,130,115,110,118,125], borderColor: '#0072ff', backgroundColor: 'rgba(0,114,255,.08)', fill: true, tension: .4, borderWidth: 2.5, pointRadius: 3 },
        ]
      },
      options: baseChartOptions(c),
    });
  }

  const a2 = document.getElementById('analyticsChart2');
  if (a2) {
    analyticsChart2 = new Chart(a2, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Savings ($)', data: [22,28,35,42,48,52,55,50,40,32,25,20],
          backgroundColor: 'rgba(0,201,167,.7)', borderRadius: 6,
        }]
      },
      options: baseChartOptions(c),
    });
  }

  const a3 = document.getElementById('analyticsChart3');
  if (a3) {
    analyticsChart3 = new Chart(a3, {
      type: 'doughnut',
      data: {
        labels: ['Solar','Battery','Government Grid'],
        datasets: [{
          data: [58, 26, 16],
          backgroundColor: ['rgba(245,158,11,.8)','rgba(0,201,167,.8)','rgba(127,0,255,.8)'],
          borderWidth: 0,
          hoverOffset: 10,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: c.text, font: { family: "'Inter', sans-serif", size: 12 }, padding: 16 } }
        },
      },
    });
  }

  const a4 = document.getElementById('analyticsChart4');
  if (a4) {
    analyticsChart4 = new Chart(a4, {
      type: 'line',
      data: {
        labels: ['Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          { label: 'Predicted Demand', data: [110,100,95,105,120,130,115,110,118,125], borderColor: '#7c3aed', borderDash: [6, 4], tension: .4, borderWidth: 2.5, pointRadius: 3 },
          { label: 'Predicted Solar', data: [130,160,180,195,200,185,155,125,100,88], borderColor: '#f59e0b', borderDash: [6, 4], tension: .4, borderWidth: 2.5, pointRadius: 3 },
        ]
      },
      options: baseChartOptions(c),
    });
  }
}

function updateSolarChart(range) {
  if (!solarChartInstance) return;
  const datasets = {
    daily: { labels: ['6 AM','8 AM','10 AM','12 PM','2 PM','4 PM','6 PM'], data: [0.5,2.1,3.8,4.8,4.5,3.2,1.1] },
    weekly: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], data: [28,32,25,35,30,38,22] },
    monthly: { labels: ['Jan','Feb','Mar','Apr','May','Jun'], data: [600,720,850,980,1050,1100] },
  };
  const d = datasets[range] || datasets.daily;
  solarChartInstance.data.labels = d.labels;
  solarChartInstance.data.datasets[0].data = d.data;
  solarChartInstance.update();
}

function updateChartsTheme() {
  const c = getChartColors();
  const charts = [solarChartInstance, tradingChartInstance, analyticsChart1, analyticsChart2, analyticsChart4];
  charts.forEach(chart => {
    if (!chart) return;
    if (chart.options.scales?.x) {
      chart.options.scales.x.ticks.color = c.text;
      chart.options.scales.x.grid.color = c.grid;
    }
    if (chart.options.scales?.y) {
      chart.options.scales.y.ticks.color = c.text;
      chart.options.scales.y.grid.color = c.grid;
    }
    chart.options.plugins.legend.labels.color = c.text;
    chart.update();
  });
  // Doughnut
  if (analyticsChart3) {
    analyticsChart3.options.plugins.legend.labels.color = c.text;
    analyticsChart3.update();
  }
}

// ═══════════════════════════════════════
//  SIMULATED LIVE DATA
// ═══════════════════════════════════════

function randomBetween(min, max, decimals = 1) {
  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function updateLiveData() {
  const solarOut = randomBetween(3.5, 5.5);
  const consumption = randomBetween(2.5, 4.0);
  const batteryPct = Math.floor(Math.random() * 30 + 65);
  const savings = (Math.random() * 40 + 100).toFixed(2);

  // Overview cards
  const el = (id) => document.getElementById(id);
  if (el('solarValue')) el('solarValue').textContent = solarOut + ' kW';
  if (el('consumptionValue')) el('consumptionValue').textContent = consumption + ' kW';
  if (el('batteryValue')) el('batteryValue').textContent = batteryPct + '%';
  if (el('savingsValue')) el('savingsValue').textContent = '$' + savings;

  // Flow values
  if (el('flowSolar')) el('flowSolar').textContent = solarOut + ' kW';
  if (el('flowHome')) el('flowHome').textContent = consumption + ' kW';
  if (el('flowBatt')) el('flowBatt').textContent = batteryPct + '%';
  if (el('flowEV')) el('flowEV').textContent = randomBetween(0.8, 1.8) + ' kW';
  if (el('flowGrid')) el('flowGrid').textContent = randomBetween(0.1, 0.8) + ' kW';

  // Solar page
  if (el('solarGen')) el('solarGen').textContent = solarOut + ' kW';

  // Battery fill
  const battFill = el('batteryFill');
  const battPctEl = el('batteryPct');
  if (battFill) battFill.style.height = batteryPct + '%';
  if (battPctEl) battPctEl.textContent = batteryPct + '%';

  // Grid status - randomize occasionally
  const gridStatuses = ['Normal', 'Normal', 'Normal', 'High', 'Critical'];
  const gridStatus = gridStatuses[Math.floor(Math.random() * gridStatuses.length)];
  const gridVal = el('gridValue');
  const gridBadge = el('gridBadge');
  if (gridVal) gridVal.textContent = gridStatus;
  if (gridBadge) {
    gridBadge.textContent = gridStatus;
    gridBadge.className = 'stat-badge ' + (gridStatus === 'Normal' ? 'badge-green' : gridStatus === 'High' ? 'badge-yellow' : 'badge-red');
  }
}

// Update every 5 seconds
setInterval(updateLiveData, 5000);

// ═══════════════════════════════════════
//  INIT
// ═══════════════════════════════════════

// Initialize charts immediately
requestAnimationFrame(() => initAllCharts());
