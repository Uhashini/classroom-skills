# Classroom Skills App

A small React + TypeScript app that helps autism kids learn six core classroom behaviors through visual, step‑by‑step activities, practice timers, and simple rewards.

The six skills covered are:

- Raise Hand
- Stay Seated
- Take Turns
- Line Up
- Clean Desk
- Transition Tasks

Each skill always follows the same routine:

1. Tutorial: 4 clear visual/text steps (5 seconds per step)
2. Practice: 45‑second countdown timer
3. Quiz: tap the correct step
4. Reward: 1–5 stars with a small confetti animation

This predictable flow supports independence, reduces anxiety around transitions, and replaces long verbal explanations with visuals.

## Features

- Home screen grid with all 6 skills
- Per‑skill flow: tutorial → practice → quiz → reward
- Visual schedule chip (“First [skill], Then Reward”)
- Weekly star progress per skill, stored in `localStorage`
- Optional simple voice prompts using the browser Speech Synthesis API
- Pure CSS styling and animations (no Tailwind, no Framer Motion)

## Technology Stack

- React + TypeScript (created with Vite)
- Styling: plain CSS in `src/index.css`
- State management: React hooks (`useState`, `useEffect`, `useRef`, `useMemo`)
- Browser APIs: `localStorage`, `speechSynthesis`
- Tooling: Vite, TypeScript, ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – type‑check and create production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint over the project

## Project Structure

- `src/main.tsx` – React entry point, renders the app into `#root`
- `src/App.tsx` – main UI and logic:
  - defines the six skills and their steps
  - manages phases (home, tutorial, practice, quiz, reward)
  - handles timer, quiz, rewards, and weekly progress
- `src/index.css` – base layout, cards, timer, stars, confetti, and other styling
