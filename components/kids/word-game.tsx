'use client'

import { useState } from 'react'
import { Delete, Lightbulb, SkipForward } from 'lucide-react'
import { pillClass } from '@/components/site/primitives'
import { wordList } from '@/lib/kids-data'
import { cn } from '@/lib/utils'

type Tile = { id: number; letter: string }

function scramble(word: string): Tile[] {
  const tiles = word.split('').map((letter, id) => ({ id, letter }))
  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }
  } while (tiles.map((t) => t.letter).join('') === word)
  return tiles
}

export function WordGame() {
  const [round, setRound] = useState(0)
  const [tiles, setTiles] = useState<Tile[]>(() => scramble(wordList[0].word))
  const [picked, setPicked] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const current = wordList[round % wordList.length]
  const guess = picked.map((id) => tiles.find((t) => t.id === id)!.letter).join('')
  const complete = guess.length === current.word.length
  const correct = complete && guess === current.word

  function goNext(addPoint: boolean) {
    if (addPoint) setScore((s) => s + 1)
    const nextRound = round + 1
    setRound(nextRound)
    setTiles(scramble(wordList[nextRound % wordList.length].word))
    setPicked([])
    setShowHint(false)
  }

  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-sm md:p-10">
      <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
        <span>Word {(round % wordList.length) + 1}</span>
        <span>Solved: {score}</span>
      </div>

      <div className="mt-8 flex min-h-20 flex-wrap justify-center gap-2" aria-live="polite" aria-label={`Your answer: ${guess || 'empty'}`}>
        {current.word.split('').map((_, i) => (
          <span
            key={i}
            className={cn(
              'grid size-12 place-items-center rounded-xl border-2 font-serif text-2xl font-bold md:size-14',
              correct ? 'border-sage bg-sage-soft text-accent-foreground' : complete ? 'border-destructive bg-destructive/10 text-destructive' : 'border-dashed border-input text-primary',
            )}
          >
            {guess[i] ?? ''}
          </span>
        ))}
      </div>

      {correct ? (
        <div className="pop mt-8 flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-3xl text-primary">Brilliant! You spelled {current.word}.</p>
          <button type="button" onClick={() => goNext(true)} className={pillClass('primary')}>
            Next word
          </button>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {tiles.map((t) => {
              const used = picked.includes(t.id)
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={used}
                  onClick={() => setPicked((p) => [...p, t.id])}
                  className="grid size-14 place-items-center rounded-xl bg-sun font-serif text-2xl font-bold text-primary shadow-[0_4px_0_#b77f24] transition-all hover:-translate-y-0.5 disabled:translate-y-1 disabled:opacity-25 disabled:shadow-none md:size-16"
                  aria-label={`Letter ${t.letter}`}
                >
                  {t.letter}
                </button>
              )
            })}
          </div>
          {complete && <p className="mt-5 text-center font-semibold text-destructive">Almost! Try a different order.</p>}
          {showHint && <p className="pop mt-5 text-center text-lg text-foreground">Hint: {current.hint}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setPicked((p) => p.slice(0, -1))} disabled={!picked.length} className={pillClass('outline')}>
              <Delete className="size-4" aria-hidden="true" /> Undo
            </button>
            <button type="button" onClick={() => setShowHint(true)} className={pillClass('outline')}>
              <Lightbulb className="size-4" aria-hidden="true" /> Hint
            </button>
            <button type="button" onClick={() => goNext(false)} className={pillClass('outline')}>
              <SkipForward className="size-4" aria-hidden="true" /> Skip
            </button>
          </div>
        </>
      )}
    </div>
  )
}
