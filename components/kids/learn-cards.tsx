'use client'

import { useState } from 'react'
import { learnCards } from '@/lib/kids-data'

const tones = ['bg-sun-soft', 'bg-sage-soft', 'bg-secondary', 'bg-accent']

export function LearnCards() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set())

  function toggle(letter: string) {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(letter)) next.delete(letter)
      else next.add(letter)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold text-primary">
        Cards explored: {flipped.size}/{learnCards.length}
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {learnCards.map((card, i) => {
          const isFlipped = flipped.has(card.letter)
          return (
            <button
              key={card.letter}
              type="button"
              onClick={() => toggle(card.letter)}
              aria-pressed={isFlipped}
              aria-label={isFlipped ? `${card.word}: ${card.fact}` : `${card.letter} is for ${card.word}. Tap for a fact.`}
              className="aspect-[3/4] [perspective:900px]"
            >
              <span data-flipped={isFlipped} className="flip-inner relative block size-full">
                <span className={`flip-face absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl p-4 shadow-sm ${tones[i % tones.length]}`}>
                  <span className="font-serif text-7xl text-primary">{card.letter}</span>
                  <span className="text-lg font-semibold text-foreground">is for {card.word}</span>
                </span>
                <span className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-primary p-5 text-center text-primary-foreground shadow-sm">
                  <span className="font-serif text-2xl">{card.word}</span>
                  <span className="text-sm leading-6 text-primary-foreground/85">{card.fact}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
