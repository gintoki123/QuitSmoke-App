<div align="center">

# 🚭 QuitSmoke

**A gamified web app that helps people quit smoking, one craving at a time**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## Overview

QuitSmoke combines behavior-change techniques with quick, interactive tools so that a user always has something to do when a craving hits: track progress, calm down, or play a short distraction game. Everything runs in the browser as a single-page application.

Graduation project, **Software Engineering Department, Near East University** (41-page report and presentation included below).

## Features

**📊 Progress & motivation**
- Smoke-free day counter, money saved and health improvement estimate
- Habit, mood, sleep and water trackers
- Stress meter and craving predictor to spot high-risk moments

**🧠 Coping tools**
- Guided breathing exercise
- Calming sounds and a custom soundscape mixer
- Quick journal for cravings and feelings
- Virtual coach with motivational messages
- Quit-plan generator and trigger identifier

**🎮 Distraction games**
- Cigarette tap game, memory game, puzzle game, reaction game
- Virtual stress ball

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 18, TypeScript |
| Build | Vite (SWC) |
| Styling | Tailwind CSS, shadcn/ui (Radix UI primitives) |
| Routing / data | React Router, TanStack Query |
| Charts & forms | Recharts, React Hook Form + Zod |
| Package manager | pnpm |

## Getting started

Requirements: **Node.js 18+** and **pnpm** (`npm install -g pnpm`).

```bash
git clone https://github.com/gintoki123/QuitSmoke-App.git
cd QuitSmoke-App
pnpm install
pnpm dev          # http://localhost:8080
```

Production build:

```bash
pnpm build        # output in dist/
pnpm preview
```

The included `vercel.json` makes the app ready for one-click deployment on Vercel.

## Project structure

```
src/
├── pages/            # Routes: Index, MoodTracker, Soundscape, NotFound
├── components/       # Feature components (trackers, games, coping tools)
│   └── ui/           # shadcn/ui building blocks
├── hooks/            # Custom React hooks
├── lib/ · utils/     # Helpers
├── App.tsx           # Router setup
└── main.tsx          # Entry point
```

## Documentation

- 📄 [Graduation project report (41 pages, PDF)](QuitSmoke%20Graduation%20Project%20Report%20-%2041%20Pages.pdf)
- 📊 [Presentation slides (PPTX)](Quit-Smoking-Support-Application.pptx)
- 🎬 [Demo video (MKV)](QuitSmoking%20Project.mkv)

## License

Released under the [MIT License](LICENSE).

## Author

**Bilal Boulaalam** · [GitHub](https://github.com/gintoki123)
