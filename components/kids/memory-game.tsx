'use client'

import { useState } from 'react'
import { Bird, Fish, Heart, RotateCcw, Star, Sun, TreePine, type LucideIcon } from 'lucide-react'
import { pillClass } from '@/components/site/primitives'
import { cn } from '@/lib/utils'
import { Stars } from './game-shell'

const faces: { id: string; label: string; icon: LucideIcon; color: string }[] = [
  { id: 'sun', label: 'Sun', icon: Sun, color: 'text-sun' },
  { id: 'tree', label: 'Tree', icon: TreePine, color: 'text-sage' },
  { id: 'fish', label: 'Fish', icon: Fish, color: 'text-primary' },
  { id: 'star', label: 'Star', icon: Star, color: 'text-sun' },
  { id: 'heart', label: 'Heart', icon: Heart, color: 'text-destructive' },
  { id: 'bird', label: 'Bird', icon: Bird, color: 'text-sage' },
]

type Card = { key: number; faceId: string }

function shuffledDeck(): Card[] {
  const deck = [...faces, ...faces].map((f, i) => ({ key: i, faceId: f.id }))
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export function MemoryGame() {
  const [deck, setDeck] = useState<Card[]>(() => shuffledDeck())
  const [open, setOpen] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)

  const won = matched.size === faces.length

  function flip(index: number) {
    if (open.length === 2 || open.includes(index) || matched.has(deck[index].faceId)) return
    const nextOpen = [...open, index]
    setOpen(nextOpen)
    if (nextOpen.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nextOpen
      if (deck[a].faceId === deck[b].faceId) {
        setMatched((prev) => new Set(prev).add(deck[a].faceId))
        setOpen([])
      } else {
        setTimeout(() => setOpen([]), 850)
      }
    }
  }

  function restart() {
    setDeck(shuffledDeck())
    setOpen([])
    setMatched(new Set())
    setMoves(0)
  }

  const stars = moves <= 8 ? 3 : moves <= 12 ? 2 : 1

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-sm">
        <p className="font-semibold text-primary">
          Moves: {moves} · Pairs: {matched.size}/{faces.length}
        </p>
        <button type="button" onClick={restart} className={pillClass('outline', 'py-2')}>
          <RotateCcw className="size-4" aria-hidden="true" /> Shuffle
        </button>
      </div>

      {won ? (
        <div className="pop flex flex-col items-center gap-4 rounded-[2rem] bg-card p-10 text-center shadow-sm" aria-live="polite">
          <Stars count={stars} max={3} />
          <h2 className="font-serif text-4xl text-primary">You found them all!</h2>
          <p className="text-lg text-muted-foreground">Finished in {moves} moves.</p>
          <button type="button" onClick={restart} className={pillClass('primary')}>
            Play again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {deck.map((card, i) => {
            const face = faces.find((f) => f.id === card.faceId)!
            const Icon = face.icon
            const isUp = open.includes(i) || matched.has(card.faceId)
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => flip(i)}
                aria-label={isUp ? face.label : 'Hidden card'}
                className="aspect-square [perspective:800px]"
              >
                <span data-flipped={isUp} className="flip-inner relative block size-full">
                  <span className="flip-face absolute inset-0 grid place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                    <span className="font-serif text-3xl">?</span>
                  </span>
                  <span
                    className={cn(
                      'flip-face flip-back absolute inset-0 grid place-items-center rounded-2xl border-2 bg-card shadow-md',
                      matched.has(card.faceId) ? 'border-sage' : 'border-sun',
                    )}
                  >
                    <Icon className={cn('size-1/2', face.color)} aria-hidden="true" />
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
