# 🏟️ FlowPass — Smart Stadium Experience System

**Elevating live events through real-time pathfinding, crowd density insights, and seamless digital navigation.**

FlowPass is a high-fidelity prototype of a next-generation smart stadium companion. Built with a focus on mobile-first interaction, it bridges the gap between stadium infrastructure and the fan experience, reducing wait times and optimizing crowd movement through data-driven insights.

---

## 🚀 Key Features

### 📍 Live Navigation & Pathfinding
- **Dynamic Routing**: Real-time path calculations from the user's location to their specific gate or seat.
- **Congestion Awareness**: Automatically reroutes users away from high-traffic zones to faster alternatives.
- **Animated SVG Maps**: Smooth, interactive map visualizations with pulsing path animations.

### 📊 Crowd Density Visualization
- **Live Heatmaps**: Visual status indicators (Low/Moderate/High) across different stadium zones.
- **Safety Messaging**: Instant alerts if a specific gate or concourse becomes critically congested.

### 🍟 Smart Queue Management
- **Wait-Time Tracking**: Real-time listing of wait times for food stalls, restrooms, and merchandise hubs.
- **Proactive Suggestions**: Intelligent recommendations for faster facilities (e.g., "Stalled A is 15 min; Stall B is 4 min").

### 🎫 Premium Digital Pass
- **Zero-Friction Entry**: Integrated digital ticket with a glowing QR code for faster gate scanning.
- **Visual Design**: High-end stub design inspired by modern premium events.

### 🔒 Zero-Config Auth System
- **Mock Identity**: Lightweight email-based login system for instant access during prototypes.
- **Session Persistence**: Maintains login state across refreshes using local storage.
- **Profile Customization**: Persistent user profiles with editable names and unique avatars.

---

## 🛠️ Tech Stack

- **Core**: React 19 + Vite
- **Styling**: Tailwind CSS (Tailwind 3 + PostCSS)
- **Animations**: Framer Motion (Native-style sliding transitions)
- **Icons**: Lucide React
- **Identity**: PWA (Standalone mobile-native experience)

---

## 📦 Getting Started

### 1. Installation
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Arpit599222/FlowPass.git
    cd FlowPass
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Development Server**:
    ```bash
    npm run dev
    ```

### 2. Mobile Access (PWA)
For the best experience, open the dev URL on your mobile browser and select **"Add to Home Screen"**. This will launch FlowPass in standalone mode, hiding the browser UI for a native app feel.

---

## 🎨 Design Aesthetics

FlowPass follows a **"Cyber Stadium"** design system:
- **Glassmorphism**: Deep blurs and semi-transparent layers for a high-end UI.
- **Fluid Layout**: Fully responsive adaptive grid that transitions from mobile stacks to wide-screen dashboards.
- **Native Interaction**: Disabled browser overscroll and "pull-to-refresh" to maintain a solid application feel.

---

## 🤝 Contributing

This is a prototype implementation. Feel free to fork the repository and explore more features like real-time socket integrations or native hardware map APIs.

**Developed with ❤️ for the future of stadium experiences.**
