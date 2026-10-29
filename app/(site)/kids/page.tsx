import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Calculator, Puzzle, ShieldCheck, Shuffle } from 'lucide-react'
import { quizTopics } from '@/lib/kids-data'

export const metadata: Metadata = {
  title: 'Kids Zone',
  description: 'Interactive learning activities, quizzes and fun games for children by People for Passion.',
}

const games = [
  {
    href: '/kids/memory',
    title: 'Memory Match',
    text: 'Flip the cards and find all the matching pairs.',
    icon: Brain,
    bg: 'bg-sage-soft',
  },
  {
    href: '/kids/math',
    title: 'Math Dash',
    text: 'Solve as many sums as you can before the timer runs out.',
    icon: Calculator,
    bg: 'bg-sun-soft',
  },
  {
    href: '/kids/words',
    title: 'Word Scramble',
    text: 'Unscramble the letters to find the hidden word.',
    icon: Shuffle,
    bg: 'bg-secondary',
  },
  {
    href: '/kids/learn',
    title: 'A to Z Fun Facts',
    text: 'Flip learning cards to discover amazing facts.',
    icon: BookOpen,
    bg: 'bg-accent',
  },
]

export default function KidsPage() {
  return (
    <main className="page-enter">
      <section className="bg-sun-soft px-5 py-14 md:px-9 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6">
          <span className="rounded-full bg-sun px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Kids Zone
          </span>
          <h1 className="max-w-3xl text-balance font-serif text-5xl leading-[1.02] text-primary md:text-7xl">
            Learn, play and <em className="text-sage">shine.</em>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Quizzes, puzzles and games made for curious minds. Earn stars, beat your best score and learn something new
            every day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-9 md:py-20" aria-labelledby="quiz-heading">
        <div className="flex items-center gap-3">
          <Puzzle className="size-6 text-sage" aria-hidden="true" />
          <h2 id="quiz-heading" className="font-serif text-3xl text-primary md:text-4xl">
            Quiz Time
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quizTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/kids/quiz/${topic.id}`}
              className="group flex flex-col justify-between gap-6 rounded-3xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-sun hover:shadow-lg"
            >
              <div>
                {topic.id === 'safety' && <ShieldCheck className="mb-3 size-6 text-sage" aria-hidden="true" />}
                <h3 className="font-serif text-2xl text-primary">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{topic.blurb}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                {topic.questions.length} questions
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card px-5 py-14 md:px-9 md:py-20" aria-labelledby="games-heading">
        <div className="mx-auto max-w-7xl">
          <h2 id="games-heading" className="font-serif text-3xl text-primary md:text-4xl">
            Games and Activities
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {games.map(({ href, title, text, icon: Icon, bg }) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-5 rounded-3xl p-6 transition-transform hover:-translate-y-1 md:p-8 ${bg}`}
              >
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-card text-primary shadow-sm">
                  <Icon className="size-8" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-primary">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
                <ArrowRight
                  className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-9">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-foreground/70">For carers & teachers</p>
            <h2 className="mt-2 font-serif text-3xl">Keep every little explorer safe with a QR Safety Tag.</h2>
          </div>
          <Link
            href="/safety"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-semibold text-primary"
          >
            Learn more <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
