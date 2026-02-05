# Classroom Skills Application

A comprehensive React-based learning platform designed to help young students develop essential classroom behaviors through interactive practice, structured learning flows, and family involvement. The application combines hands-on skill practice with detailed parent feedback to create a complete behavioral development ecosystem.

## About the Use Case

**Purpose**: Help young students develop essential classroom behaviors through interactive practice and family involvement.

**Main Application Features**:
- Six core classroom skills: Raise Hand, Stay Seated, Take Turns, Line Up, Clean Desk, Transition Tasks
- Each skill broken down into simple, actionable steps
- Structured learning flow: Tutorial → Practice (45 seconds) → Quiz → Rewards
- Weekly progress tracking with star-based rewards
- Local data storage for progress monitoring
- Optional voice prompts for accessibility

**Family Feedback System**:
- Parents submit detailed observations about at-home practice
- Comprehensive feedback form with multiple sections
- Skill ratings on 1-5 scale for five behavioral areas
- Challenge area checkboxes for common difficulties
- Open-ended text fields for successes and improvement areas
- Support request options with preferred contact methods

**Overall Goal**: Create a complete learning ecosystem where classroom instruction, independent practice, and family involvement work together to reinforce positive behaviors and keep teachers and parents informed about student progress.

## Core Features

### 🎯 Classroom Skills Practice (Main App)

**Six Essential Skills:**
- Raise Hand
- Stay Seated
- Take Turns
- Line Up
- Clean Desk
- Transition Tasks

**Structured Learning Flow:**
1. **Tutorial Phase**: Visual step-by-step demonstration (auto-advances every 5 seconds)
2. **Practice Phase**: 45-second timed practice session with countdown
3. **Quiz Phase**: Interactive quiz to test step sequence understanding
4. **Reward Phase**: Star-based rewards (1-5 stars) with confetti animation

**Progress Tracking:**
- Weekly star accumulation per skill
- Total weekly progress display
- Persistent data storage using localStorage
- Visual progress indicators

**Accessibility Features:**
- Optional voice prompts using Speech Synthesis API
- Sound on/off toggle
- Clear visual schedules ("First [skill], Then Reward")
- Predictable flow to reduce anxiety

### 👨‍👩‍👧 Family Feedback System

**Comprehensive Feedback Form with 6 Sections:**

1. **📋 Basic Information**
   - Child name (required)
   - Parent/Guardian name (required)
   - Feedback date picker (required)
   - Grade level dropdown (Pre-K through 5th Grade)

2. **🏠 At-Home Practice**
   - Practice activities description (textarea)
   - Practice frequency dropdown (Daily, 3-4x/week, etc.)
   - Average minutes per day (number input)

3. **⭐ Skill Progress Ratings**
   - 1-5 scale ratings for five key skills:
     - Focus & Attention
     - Following Directions
     - Turn-Taking & Sharing
     - Emotional Regulation
     - Social Interaction with Peers

4. **⚠️ Challenge Areas**
   - Multiple checkbox selections:
     - Attention & Focus Difficulties
     - Behavioral Issues
     - Social Interaction Challenges
     - Academic Task Completion
     - Motivation & Engagement

5. **📝 Detailed Observations**
   - Specific challenges (textarea)
   - Successes & achievements (textarea)
   - Areas for improvement (textarea)
   - Additional comments (textarea)

6. **🤝 Support & Follow-up**
   - Needs support (Yes/No radio buttons - required)
   - Conditional support type dropdown
   - Preferred contact method dropdown

**Feedback Display:**
- Historical feedback submissions
- Visual skill rating displays with stars
- Challenge area badges
- Highlighted support requests
- Organized card-based layout

## Technology Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 6.30.1
- **Language**: JavaScript (with TypeScript support available)
- **Styling**: Pure CSS (no frameworks)
- **State Management**: 
  - React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`) for function components
  - Class component state management for Family Feedback
- **Browser APIs**: 
  - `localStorage` for data persistence
  - `speechSynthesis` for voice prompts
- **Tooling**: ESLint for code quality

## React Concepts Demonstrated

| Concept | Implementation | Location |
|---------|---------------|----------|
| **Function Component** | Main App component using hooks | `App.jsx`, `main.jsx` (AppRouter) |
| **Class Component** | Family Feedback with lifecycle methods | `FamilyFeedback.jsx` |
| **Event Handling** | onClick, onChange, onSubmit events | Throughout both components |
| **State Management** | `useState` hooks and `this.state` | Both files |
| **Forms** | Comprehensive controlled forms | `FamilyFeedback.jsx` |
| **Lifecycle Methods** | componentDidMount, componentDidUpdate | `FamilyFeedback.jsx` |
| **Routing** | React Router with multiple routes | `main.jsx` |

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).



## Project Structure

```
classroom-skills/
├── src/
│   ├── main.jsx              # Entry point, routing setup
│   ├── App.jsx               # Main classroom skills app (function component)
│   ├── FamilyFeedback.jsx    # Family feedback form (class component)
│   ├── index.css             # Global styles and animations
│   └── assets/               # Static assets
├── public/                   # Public assets
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

### Key Files

- **`main.jsx`**: React entry point with React Router setup, navigation bar, and route definitions
- **`App.jsx`**: Main classroom skills application
  - Defines six skills with steps and learning objectives
  - Manages learning phases (home, tutorial, practice, quiz, reward)
  - Handles timer logic, quiz generation, and reward calculations
  - Tracks weekly progress and star accumulation
- **`FamilyFeedback.jsx`**: Comprehensive parent feedback system
  - Class component with lifecycle methods
  - Multi-section form with diverse input types
  - Feedback history display with visual enhancements
  - localStorage integration for data persistence
- **`index.css`**: Complete styling system
  - Layout and responsive design
  - Card components and animations
  - Timer and progress bar styles
  - Confetti and star animations

## Navigation

The application features a simple navigation bar with two main sections:

- **Classroom Skills** (`/`) - Main learning application
- **Family Feedback** (`/feedback`) - Parent feedback submission

## Data Persistence

All data is stored locally in the browser using `localStorage`:

- **Classroom Skills**: Weekly progress and star counts per skill
- **Family Feedback**: Complete feedback submission history

## Future Enhancements

- Backend integration for teacher dashboard
- Multi-user support with authentication
- Export feedback reports as PDF
- Mobile app version
- Analytics and progress charts
- Customizable skill sets

## License

This project is for educational purposes.

---


