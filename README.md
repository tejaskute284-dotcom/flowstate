# 🌊 FlowState | Focus OS

> **"Your command center for deep work."**

![React 18](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white) 
![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white) 
![Tailwind 4](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white) 
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)

---

## 📖 Table of Contents

-   [About](#-about)
-   [Premium Features](#-premium-features)
-   [Technical Stack](#-technical-stack)
-   [Project Structure](#-project-structure)
-   [Getting Started](#-getting-started)
-   [Contributing](#-contributing)
-   [License](#-license)

---

## 📖 About

**FlowState** is a premium, intent-focused operating system concept designed to help professionals regain control over their focus. By unifying emails, meetings, and commitments into a single, visually stunning interface, FlowState eliminates the "tab-switching" tax and promotes continuous deep work.

## ✨ Premium Features

### 🧩 Intent-Focused Architecture
FlowState parses intent for maximum efficiency:
- **Action Required**: Priority emails that need your immediate decision are highlighted.
- **Thread Continuity**: A visual timeline that bridges the gap between email threads and calendar events.
- **Focus Mode**: A dedicated environment that blocks distractions and signals focus time to your team.

### 🎨 The "Premium Soft" Design System
A state-of-the-art visual system built for long-duration deep work:
- **Cinematic & Pearl Shadows**: Custom 4-layer shadow hierarchy (Ambient, Depth, Detail, Atmosphere) for physical depth.
- **Organic Curves**: Standardized **24px organic curves** (`rounded-3xl`) across the entire UI.
- **Glassmorphism Pro**: High-fidelity backdrop blurs and saturated overlays.
- **Ambient Lighting**: Subtle grain overlays and radial glows that respond to your theme.

### ⚡ Command Performance
- **Omni-Search Palette**: `⌘ + K` navigate anywhere or trigger actions instantly.
- **Physics-Based Motion**: Powered by **Framer Motion** and **Lenis** for high-end inertia scrolling.

---

## 🛠️ Technical Stack

FlowState is built with a modern stack designed for scalability.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **React 18** | Component-based UI library |
| **Build Tool** | **Vite 6** | Next-generation frontend tooling |
| **Styling** | **Tailwind CSS 4** | Utility-first CSS framework |
| **Animations** | **Framer Motion 12** | Production-ready motion library |
| **Scrolling** | **Lenis** | Smooth scroll normalization |
| **Icons** | **Lucide React** | Consistent icon set |
| **Typography** | **Inter** | Highly legible variable font |

---

## 📂 Project Structure

The project follows a modular, view-based architecture.

```bash
src/
├── app/
│   ├── components/    # Atomic & Molecule UI components
│   ├── context/       # Theme and Global State providers
│   ├── data/          # Centralized Mock Data & Type definitions
│   ├── views/         # Modular View components (Inbox, Calendar, Dashboard, etc.)
│   └── App.tsx        # Main Entry & View Router
├── styles/
│   ├── flowstate.css  # Core Design System (Shadows, Curves, Gradients)
│   ├── theme.css      # Shadcn/Tailwind palette definitions
│   └── fonts.css      # Typography setup
└── main.tsx           # Application Entry Point
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/tejaskute284-dotcom/flowstate.git
    cd flowstate
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open in browser**
    Visit `http://localhost:5173` to view the application.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---