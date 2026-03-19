# Kevin Chung Portfolio

<p align="center">
  <img src="public/profile.png" alt="Kevin Chung" width="150" height="150" style="border-radius: 50%;" />
</p>

<p align="center">
  A modern, interactive developer portfolio featuring stunning 3D graphics, smooth animations, and a beautiful glassmorphism aesthetic.
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-r182-black?logo=three.js)

</p>

---

## Features

- **3D Interactive Graphics** - Immersive Three.js scenes with React Three Fiber
- **Smooth Animations** - Fluid transitions powered by Framer Motion
- **Glassmorphism Design** - Modern glass-effect UI components
- **Dark/Light Mode** - Seamless theme switching with next-themes
- **Smooth Scrolling** - Buttery smooth navigation with Lenis
- **Fully Responsive** - Optimized for all screen sizes
- **Performance Optimized** - React Compiler + Turbopack for blazing speed

---

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kevin-chung-portfolio.git
cd kevin-chung-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## Scripts

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Start development server with Turbopack |
| `npm run build`      | Build for production                    |
| `npm start`          | Start production server                 |
| `npm run lint`       | Run ESLint and auto-fix issues          |
| `npm run lint:check` | Check for linting errors                |
| `npm run format`     | Format code with Prettier               |
| `npm run typecheck`  | Run TypeScript type checking            |

---

## Tech Stack

### Core

| Technology                                    | Version | Purpose                         |
| --------------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                | 16.1    | React framework with App Router |
| [React](https://react.dev/)                   | 19      | UI library                      |
| [TypeScript](https://www.typescriptlang.org/) | 5       | Type safety                     |
| [Tailwind CSS](https://tailwindcss.com/)      | 4       | Utility-first styling           |

### 3D & Animation

| Technology                                                  | Purpose                     |
| ----------------------------------------------------------- | --------------------------- |
| [Three.js](https://threejs.org/)                            | 3D graphics engine          |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [Drei](https://github.com/pmndrs/drei)                      | Useful helpers for R3F      |
| [Framer Motion](https://www.framer.com/motion/)             | Animation library           |
| [Lenis](https://lenis.darkroom.engineering/)                | Smooth scroll               |

### UI & State

| Technology                                                | Purpose              |
| --------------------------------------------------------- | -------------------- |
| [shadcn/ui](https://ui.shadcn.com/)                       | UI component library |
| [Zustand](https://zustand-demo.pmnd.rs/)                  | State management     |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management     |
| [Lucide React](https://lucide.dev/)                       | Icon library         |
| [Sonner](https://sonner.emilkowal.ski/)                   | Toast notifications  |

---

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/og/               # Open Graph image generation
│   ├── projects/[slug]/      # Dynamic project pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
│
├── components/
│   ├── about/                # About section components
│   ├── contact/              # Contact form & footer
│   ├── hero/                 # Hero section
│   ├── projects/             # Project showcase
│   ├── providers/            # Context providers
│   ├── three/                # Three.js 3D components
│   └── ui/                   # Reusable UI components
│
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities & helpers
├── stores/                   # Zustand state stores
└── types/                    # TypeScript type definitions
```

---

## Configuration

### Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## Design System

### Color Palette

The design uses OKLCH color space for perceptually uniform colors:

- **Primary**: Purple gradient (`oklch(0.7 0.2 280)`)
- **Accent**: Cyan/Blue highlights
- **Background**: Deep purple-tinted dark/light modes

### Glass Effects

```css
.glass        /* Light glass effect */
.glass-heavy  /* Heavy glass effect */
```

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/kevin-chung-portfolio)

### Manual Build

```bash
npm run build
npm start
```

---

## License

MIT License - feel free to use this for your own portfolio!

---

Built with Next.js, Three.js, and a passion for creative development.
