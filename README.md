# Trinkaloop Saga

![Parallax Comic Banner](assets/images/banner.webp)

An immersive parallax-scrolling comic experience designed for desktop displays.

## Technical Specifications

### 🌟 Core Features
- Multi-layered parallax scenes (7 depth tiers)
- Dynamic sprite animations
- Chapter-based navigation
- 21:9 aspect ratio scenes (3840×1620px recommended)

### 🖥️ System Requirements
- **Minimum screen width**: 1200px
- **Recommended browsers**: Chrome, Firefox, Edge
- **GPU acceleration**: Required for optimal performance

## Project Structure
/Trinkaloop
├── assets/ <br>
│ ├── scenes/ # Scene assets organized by chapter<br>
│ ├── images/<br>
│ │ ├── characters/ # Sprite sheets<br>
│ │ └── ui/ # Interface elements<br>
│ └── fonts/<br>
├── css/<br>
│ └── base.css # Main stylesheet<br>
└── js/<br>
├── parallax.js # Core engine (v2.1)<br>
├── scenes.js # Scene loader (v1.4)<br>
└── sprites.js # Animation handler<br>
