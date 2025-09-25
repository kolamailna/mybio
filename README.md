# MyBio - Tap Bio Dashboard Clone

A mobile-first implementation of the Tap Bio dashboard with complete mobile optimization and touch gesture support.

## 📁 Repository Structure

```
mybio/
├── mobile-app/                 # 🚀 Main Mobile Application
│   ├── index.html             # Main dashboard (landing page)
│   ├── css/main.css           # Mobile-first styling
│   ├── js/main.js             # Touch gestures & interactions
│   ├── server.js              # Express development server
│   ├── package.json           # Dependencies
│   └── TASK.md               # Complete implementation docs
│
├── reference-materials/        # 📚 Original Reference Files
│   ├── *.html                 # Original Tap Bio HTML exports
│   ├── images/                # Reference images
│   └── instruction.txt        # Original instructions
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Run the Mobile App

```bash
cd mobile-app
npm install
npm start
```

The app will be available at `http://localhost:12000`

## ✨ Features

### 📱 Mobile-First Design
- **Main Dashboard**: Profile preview with interactive cards
- **Settings Modal**: Full-screen overlay with complete menu
- **Touch Gestures**: Swipe to close modal, haptic feedback
- **Responsive**: Perfect on all mobile screen sizes

### 🎮 User Experience
- **Native Feel**: iOS/Android-style interactions
- **Smooth Animations**: 60fps hardware-accelerated transitions
- **Copy Functionality**: Working clipboard API with notifications
- **Share Integration**: Native device sharing support

### 🔧 Technical Features
- **PWA Ready**: Service worker support for offline use
- **Safe Areas**: iOS notch and home indicator support
- **Dark Mode**: Automatic theme detection
- **Performance**: Optimized for mobile devices

## 📖 Documentation

Complete implementation details and features are documented in:
- [`mobile-app/TASK.md`](mobile-app/TASK.md) - Full technical documentation

## 🎯 Architecture

- **Landing Page**: Main dashboard with profile preview (not settings)
- **Modal Overlay**: Account settings as full-screen overlay
- **Mobile-Optimized**: 100% touch-friendly interface
- **Gesture Support**: Swipe gestures for natural navigation

## 📚 Reference Materials

The `reference-materials/` directory contains:
- Original Tap Bio HTML exports for design reference
- Screenshots and images from the original dashboard
- Initial project instructions and requirements

---

**Live Demo**: [View Mobile App](https://work-1-uvuvgceglujkgczc.prod-runtime.all-hands.dev)