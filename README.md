# THIRAN 2026 - Tech Symposium Website

## Project Info

A modern, immersive website for THIRAN 2026 - the ultimate tech symposium featuring AR/VR experiences.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion, GSAP

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd thiran-cosmic-canvas

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

## Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # shadcn/ui components
│   └── reactbits/ # Custom animated components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── data/          # Static data files
```

## Features

- 🎮 Interactive 3D VR headset with mouse tracking
- ✨ Animated text effects (DecryptedText, BlurText, GradientText)
- 🌟 Cosmic-themed backgrounds and particle effects
- 📱 Fully responsive design
- ⏱️ Live countdown timer
- 🎯 Smooth scroll animations

## Deployment

Build the project and deploy the `dist` folder to any static hosting service:

```sh
npm run build
```

Compatible with: Vercel, Netlify, GitHub Pages, etc.

## License

MIT
