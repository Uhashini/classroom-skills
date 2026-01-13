import { useEffect, useMemo, useRef, useState } from 'react'
import './index.css'

type SkillKey =
  | 'raiseHand'
  | 'staySeated'
  | 'takeTurns'
  | 'lineUp'
  | 'cleanDesk'
  | 'transitionTasks'

type Activity = {
  key: SkillKey
  title: string
  why: string
  steps: string[]
}

type Phase = 'home' | 'tutorial' | 'practice' | 'quiz' | 'reward'

type Progress = {
  [week: string]: {
    [key in SkillKey]?: number
  }
}

const activities: Activity[] = [
  {
    key: 'raiseHand',
    title: 'Raise Hand',
    why: 'Prevents blurting; teaches turn-taking signals',
    steps: ['Look at teacher', 'Raise one hand high', 'Keep still', 'Wait quietly'],
  },
  {
    key: 'staySeated',
    title: 'Stay Seated',
    why: 'Reduces wandering/fidgeting during lessons',
    steps: ['Feet on floor', 'Back against chair', 'Hands on desk', 'Eyes forward'],
  },
  {
    key: 'takeTurns',
    title: 'Take Turns',
    why: 'Builds sharing and patience',
    steps: ["Watch friend's turn", 'Wait for name', 'Go when called', 'Pass to next'],
  },
  {
    key: 'lineUp',
    title: 'Line Up',
    why: 'Safe movement transitions',
    steps: ['Stand behind friend', 'Hands at sides', 'Face forward', 'Wait signal'],
  },
  {
    key: 'cleanDesk',
    title: 'Clean Desk',
    why: 'End-of-task routines',
    steps: ['Put papers in folder', 'Pencils in case', 'Trash in bin', 'Wipe surface'],
  },
  {
    key: 'transitionTasks',
    title: 'Transition Tasks',
    why: 'Reduces anxiety between activities',
    steps: ['Finish current work', 'Put away materials', 'Get next item', 'Start new'],
  },
]

function getWeekKey(date = new Date()) {
  const dt = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = dt.getUTCDay() || 7
  dt.setUTCDate(dt.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((dt.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${dt.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

function speak(text: string) {
  try {
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 1
    utter.pitch = 1
    speechSynthesis.cancel()
    speechSynthesis.speak(utter)
  } catch { void 0 }
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('home')
  const [selected, setSelected] = useState<Activity | null>(null)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [timerSec, setTimerSec] = useState(45)
  const [quizTargetStep, setQuizTargetStep] = useState(2)
  const [quizChoices, setQuizChoices] = useState<string[]>([])
  const [stars, setStars] = useState(0)
  const [progress, setProgress] = useState<Progress>({})
  const [soundOn, setSoundOn] = useState(true)
  const practiceStartedRef = useRef(false)
  const weekKey = useMemo(() => getWeekKey(), [])
  const [confetti, setConfetti] = useState<{ left: string; delay: string; background: string }[]>(
    []
  )

  useEffect(() => {
    try {
      const raw = localStorage.getItem('progress')
      if (raw) setTimeout(() => setProgress(JSON.parse(raw)), 0)
    } catch { void 0 }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('progress', JSON.stringify(progress))
    } catch { void 0 }
  }, [progress])

  useEffect(() => {
    if (phase !== 'tutorial') return
    if (!selected) return
    setTimeout(() => setTutorialStep(0), 0)
    const id = setInterval(() => {
      setTutorialStep((s) => {
        if (s >= 3) {
          clearInterval(id)
          setPhase('practice')
          return 3
        }
        return s + 1
      })
    }, 5000)
    if (soundOn) speak(`${selected.title}. Step 1. ${selected.steps[0]}`)
    return () => clearInterval(id)
  }, [phase, selected, soundOn])

  useEffect(() => {
    if (phase === 'reward') {
      const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#a78bfa']
      const items = Array.from({ length: 12 }).map((_, i) => ({
        left: `${Math.floor(Math.random() * 100)}%`,
        delay: `${i * 80}ms`,
        background: colors[i % colors.length],
      }))
      setTimeout(() => setConfetti(items), 0)
    } else {
      setTimeout(() => setConfetti([]), 0)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'practice') return
    practiceStartedRef.current = true
    setTimeout(() => setTimerSec(45), 0)
    if (soundOn && selected) speak(`Practice ${selected.title} for forty five seconds`)
    const id = setInterval(() => {
      setTimerSec((t) => {
        const next = t - 1
        if (soundOn && (next === 30 || next === 15 || next === 5)) speak(`${next} seconds`)
        if (next <= 0) {
          clearInterval(id)
          setPhase('quiz')
          return 0
        }
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase, soundOn, selected])

  useEffect(() => {
    if (phase !== 'quiz' || !selected) return
    const target = Math.floor(Math.random() * 4)
    setTimeout(() => setQuizTargetStep(target), 0)
    const shuffled = [...selected.steps].sort(() => Math.random() - 0.5)
    setTimeout(() => setQuizChoices(shuffled), 0)
    if (soundOn) speak(`Quiz. Tap the correct step`)
  }, [phase, selected, soundOn])

  function startActivity(a: Activity) {
    setSelected(a)
    setPhase('tutorial')
  }

  function backHome() {
    setSelected(null)
    setPhase('home')
  }

  function onAnswer(choice: string) {
    if (!selected) return
    const correct = selected.steps[quizTargetStep]
    const timerBonus = timerSec === 0 ? 1 : 0
    const quizBonus = choice === correct ? 1 : 0
    const base = 3
    const earned = Math.max(1, Math.min(5, base + timerBonus + quizBonus))
    setStars(earned)
    setPhase('reward')
    const wk = weekKey
    setProgress((p) => {
      const next = { ...p }
      if (!next[wk]) next[wk] = {}
      const prev = next[wk][selected.key] || 0
      next[wk][selected.key] = prev + earned
      return next
    })
    if (soundOn) speak(`Great job. You earned ${earned} stars`)
  }

  function resetFlow() {
    setTutorialStep(0)
    setTimerSec(45)
    setStars(0)
    practiceStartedRef.current = false
  }

  const currentWeek = progress[weekKey] || {}
  const weekTotal = Object.values(currentWeek).reduce((a, b) => a + (b || 0), 0)

  return (
    <div className="container">
      <div className="header">
        <div className="row">
          {phase !== 'home' && (
            <button className="btn ghost" onClick={backHome}>Back</button>
          )}
          <h1 className="title">Classroom Skills</h1>
        </div>
        <div className="row">
          <div className="chip">Week {weekKey}</div>
          <div className="chip">Total ★ {weekTotal}</div>
          <button className="btn secondary" onClick={() => setSoundOn((s) => !s)}>
            {soundOn ? 'Sound On' : 'Sound Off'}
          </button>
        </div>
      </div>

      {phase === 'home' && (
        <div className="grid">
          {activities.map((a) => {
            const starsThisWeek = currentWeek[a.key] || 0
            return (
              <div key={a.key} className="card" onClick={() => startActivity(a)}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="title" style={{ fontSize: 18 }}>{a.title}</div>
                  <div className="chip">★ {starsThisWeek}</div>
                </div>
                <div className="subtitle" style={{ marginTop: 6 }}>{a.why}</div>
                <div className="space" />
                <div className="chips">
                  {a.steps.map((s, i) => (
                    <div key={i} className="chip" title={s}>{i + 1}</div>
                  ))}
                </div>
                <div className="space" />
                <button className="btn">Start</button>
              </div>
            )
          })}
        </div>
      )}

      {phase !== 'home' && selected && (
        <div className="phase">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="schedule">First {selected.title}, Then Reward</div>
            <div className="chips">
              <div className="chip">Steps 4</div>
              <div className="chip">Timer 45s</div>
              <div className="chip">Quiz 1</div>
            </div>
          </div>

          {phase === 'tutorial' && (
            <div>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="title" style={{ fontSize: 20 }}>Tutorial</div>
                <button className="btn ghost" onClick={() => setPhase('practice')}>Skip</button>
              </div>
              <div className="steps">
                {selected.steps.map((s, i) => (
                  <div key={i} className={`step ${i === tutorialStep ? 'active' : ''}`}>
                    <div className="label">Step {i + 1}</div>
                    <div style={{ fontSize: 18 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === 'practice' && (
            <div>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="title" style={{ fontSize: 20 }}>Practice</div>
                <button className="btn ghost" onClick={() => setPhase('quiz')}>Skip</button>
              </div>
              <div className="timer">
                <div className="ring" />
                <div className="dial">{timerSec}</div>
              </div>
              <div className="progressbar">
                <div
                  className="progressfill"
                  style={{ width: `${((45 - timerSec) / 45) * 100}%` }}
                />
              </div>
            </div>
          )}

          {phase === 'quiz' && (
            <div>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="title" style={{ fontSize: 20 }}>Quiz</div>
                <button className="btn ghost" onClick={() => onAnswer('')}>Skip</button>
              </div>
              <div className="subtitle" style={{ marginBottom: 12 }}>
                Tap the correct step {quizTargetStep + 1}
              </div>
              <div className="grid">
                {quizChoices.map((c, i) => (
                  <button key={i} className="card" onClick={() => onAnswer(c)}>
                    <div className="label">Option {i + 1}</div>
                    <div style={{ fontSize: 18 }}>{c}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'reward' && (
            <div>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="title" style={{ fontSize: 20 }}>Reward</div>
                <div className="subtitle">Earn 3+ to unlock next</div>
              </div>
              <div className="confetti">
                {confetti.map((p, i) => (
                  <div
                    key={i}
                    className="piece"
                    style={{
                      left: p.left,
                      background: p.background,
                      animationDelay: p.delay,
                    }}
                  />
                ))}
              </div>
              <div className="stars" style={{ margin: '24px 0' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`star ${i < stars ? 'win' : ''}`}>★</span>
                ))}
              </div>
              <div className="row" style={{ justifyContent: 'center', gap: 12 }}>
                <button
                  className="btn secondary"
                  onClick={() => {
                    resetFlow()
                    setPhase('tutorial')
                  }}
                >
                  Try Again
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    resetFlow()
                    backHome()
                  }}
                >
                  Back Home
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
