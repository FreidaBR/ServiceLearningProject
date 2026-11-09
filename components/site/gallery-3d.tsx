'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Images } from 'lucide-react'

const photos = [
  {
    src: 'https://peopleforpassion.netlify.app/images/event-1.jpg',
    alt: 'People for Passion volunteers gathered at a community event',
    title: 'Coming together in community',
  },
  {
    src: 'https://peopleforpassion.netlify.app/images/event-2.jpg',
    alt: 'People for Passion volunteers taking part in an event',
    title: 'Hands-on care in action',
  },
  {
    src: 'https://peopleforpassion.netlify.app/images/event-3.jpg',
    alt: 'People for Passion community members sharing a moment',
    title: 'Making space for connection',
  },
  {
    src: 'https://peopleforpassion.netlify.app/images/event-4.jpg',
    alt: 'People for Passion volunteers supporting their community',
    title: 'Showing up for one another',
  },
]

export function Gallery3D() {
  const [active, setActive] = useState(0)
  const current = photos[active]
  const previous = photos[(active - 1 + photos.length) % photos.length]
  const next = photos[(active + 1) % photos.length]

  const move = (direction: number) => {
    setActive((index) => (index + direction + photos.length) % photos.length)
  }

  return (
    <section className="overflow-hidden bg-primary px-5 py-16 text-primary-foreground md:px-9 md:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-sun">
            <Images className="size-4" aria-hidden="true" /> Our moments
          </div>
          <h2 id="gallery-heading" className="mt-5 max-w-sm font-serif text-4xl leading-tight md:text-5xl">
            The people behind the passion.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-primary-foreground/75">
            From recognition to everyday acts of care, these moments remind us what can happen when people come together.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => move(-1)}
              className="inline-flex size-11 items-center justify-center border border-primary-foreground/30 transition hover:bg-primary-foreground/10"
              aria-label="Previous gallery image"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="inline-flex size-11 items-center justify-center border border-primary-foreground/30 transition hover:bg-primary-foreground/10"
              aria-label="Next gallery image"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <span className="ml-2 text-sm text-primary-foreground/65" aria-live="polite">
              {active + 1} / {photos.length}
            </span>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[390px] w-full max-w-2xl items-center justify-center [perspective:1200px]">
          <div className="relative h-[300px] w-[min(78vw,430px)] sm:h-[350px]">
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rotate-y-[-14deg] overflow-hidden border border-primary-foreground/15 opacity-45 shadow-xl transition-all duration-500 sm:-translate-x-[72%]">
              <img src={previous.src} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-primary-foreground/25 bg-card p-2 shadow-2xl transition-all duration-500">
              <img src={current.src} alt={current.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-x-2 bottom-2 bg-primary/85 px-4 py-3 text-sm font-semibold backdrop-blur-sm">
                {current.title}
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rotate-y-[14deg] overflow-hidden border border-primary-foreground/15 opacity-45 shadow-xl transition-all duration-500 sm:translate-x-[12%]">
              <img src={next.src} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
