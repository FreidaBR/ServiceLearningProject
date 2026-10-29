'use client'

import { useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'
import { pillClass } from '@/components/site/primitives'
import type { QuizTopic } from '@/lib/kids-data'
import { cn } from '@/lib/utils'
import { Stars } from './game-shell'

export function QuizGame({ topic }: { topic: QuizTopic }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = topic.questions[index]
  const total = topic.questions.length

  function choose(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  function next() {
    if (index + 1 >= total) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  function restart() {
    setIndex(0)
    setPicked(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    const stars = Math.round((score / total) * 5)
    return (
      <div className="pop flex flex-col items-center gap-5 rounded-[2rem] bg-card p-10 text-center shadow-sm">
        <Stars count={stars} max={5} />
        <h2 className="font-serif text-4xl text-primary">
          {score === total ? 'Perfect score!' : score >= total / 2 ? 'Great job!' : 'Nice try!'}
        </h2>
        <p className="text-lg text-muted-foreground">
          You got <b className="text-primary">{score}</b> out of {total} correct.
        </p>
        <button type="button" onClick={restart} className={pillClass('primary')}>
          <RotateCcw className="size-4" aria-hidden="true" /> Play again
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-sm md:p-10">
      <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div className="h-full rounded-full bg-sun transition-all" style={{ width: `${(index / total) * 100}%` }} />
      </div>
      <h2 key={index} className="pop mt-8 text-balance font-serif text-3xl text-primary md:text-4xl">
        {q.question}
      </h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer
          const isPicked = i === picked
          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={cn(
                'flex items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left text-lg font-semibold transition-all',
                picked === null && 'border-border bg-background hover:-translate-y-0.5 hover:border-sun',
                picked !== null && isAnswer && 'border-sage bg-sage-soft text-accent-foreground',
                picked !== null && isPicked && !isAnswer && 'border-destructive bg-destructive/10 text-destructive',
                picked !== null && !isAnswer && !isPicked && 'border-border bg-background opacity-60',
              )}
            >
              {opt}
              {picked !== null && isAnswer && <Check className="size-5 shrink-0" aria-label="Correct answer" />}
              {isPicked && !isAnswer && <X className="size-5 shrink-0" aria-label="Wrong answer" />}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="pop mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-sun-soft p-5 sm:flex-row sm:items-center" aria-live="polite">
          <p className="text-foreground">
            <b className="text-primary">{picked === q.answer ? 'Correct! ' : 'Not quite. '}</b>
            {q.fact}
          </p>
          <button type="button" onClick={next} className={pillClass('primary', 'shrink-0')}>
            {index + 1 >= total ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
