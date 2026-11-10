'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Timer } from 'lucide-react'
import { pillClass } from '@/components/site/primitives'
import { cn } from '@/lib/utils'

type Level = 'easy' | 'medium' | 'hard'
type Problem = { text: string; answer: number; options: number[] }

const DURATION = 45

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeProblem(level: Level): Problem {
  let a: number, b: number, op: string, answer: number
  if (level === 'easy') {
    a = rand(1, 10)
    b = rand(1, 10)
    op = '+'
    answer = a + b
  } else if (level === 'medium') {
    a = rand(5, 30)
    b = rand(1, a)
    op = Math.random() > 0.5 ? '+' : '−'
    answer = op === '+' ? a + b : a - b
  } else {
    a = rand(2, 12)
    b = rand(2, 10)
    op = '×'
    answer = a * b
  }
  const options = new Set<number>([answer])
  while (options.size < 4) options.add(Math.max(0, answer + rand(-6, 6)))
  return { text: `${a} ${op} ${b}`, answer, options: [...options].sort(() => Math.random() - 0.5) }
}

export function MathGame() {
  const [level, setLevel] = useState<Level>('easy')
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState<Problem | null>(null)
  const [flash, setFlash] = useState<'right' | 'wrong' | null>(null)
  const [best, setBest] = useState(0)
  const scoreRef = useRef(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false)
          setBest((b) => Math.max(b, scoreRef.current))
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  function start() {
    scoreRef.current = 0
    setScore(0)
    setTimeLeft(DURATION)
    setProblem(makeProblem(level))
    setRunning(true)
  }

  function answer(n: number) {
    if (!problem || !running) return
    const right = n === problem.answer
    if (right) {
      scoreRef.current += 1
      setScore(scoreRef.current)
    }
    setFlash(right ? 'right' : 'wrong')
    setTimeout(() => setFlash(null), 250)
    setProblem(makeProblem(level))
  }

  const finished = !running && timeLeft === 0

  return (
    <div className="flex flex-col gap-6">
      {!running && (
        <div className="rounded-[2rem] bg-card p-6 text-center shadow-sm md:p-10">
          {finished && (
            <div className="pop mb-6" aria-live="polite">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"Time's up!"}</p>
              <p className="mt-2 font-serif text-5xl text-primary">{score} correct</p>
              <p className="mt-1 text-muted-foreground">Best this session: {best}</p>
            </div>
          )}
          <p className="font-semibold text-primary">Choose your level</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Difficulty">
            {(['easy', 'medium', 'hard'] as Level[]).map((l) => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={level === l}
                onClick={() => setLevel(l)}
                className={cn(
                  'rounded-full border-2 px-5 py-2 font-semibold capitalize transition-colors',
                  level === l ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background',
                )}
              >
                {l === 'easy' ? 'Easy (+)' : l === 'medium' ? 'Medium (+ −)' : 'Hard (×)'}
              </button>
            ))}
          </div>
          <button type="button" onClick={start} className={pillClass('sun', 'mt-7 px-8 py-4 text-base')}>
            <Play className="size-5" aria-hidden="true" /> {finished ? 'Play again' : 'Start'}
          </button>
        </div>
      )}

      {running && problem && (
        <div
          className={cn(
            'rounded-[2rem] bg-card p-6 shadow-sm transition-colors md:p-10',
            flash === 'right' && 'bg-sage-soft',
            flash === 'wrong' && 'bg-destructive/10',
          )}
        >
          <div className="flex items-center justify-between font-semibold text-primary">
            <span className="inline-flex items-center gap-2">
              <Timer className="size-5" aria-hidden="true" /> {timeLeft}s
            </span>
            <span>Score: {score}</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted" aria-hidden="true">
            <div className="h-full rounded-full bg-sun transition-all" style={{ width: `${(timeLeft / DURATION) * 100}%` }} />
          </div>
          <p className="mt-10 text-center font-serif text-6xl text-primary md:text-7xl" aria-live="polite">
            {problem.text} = ?
          </p>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-3">
            {problem.options.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => answer(n)}
                className="rounded-2xl border-2 border-border bg-background py-5 text-3xl font-bold text-primary transition-all hover:-translate-y-0.5 hover:border-sun"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
