import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Calculator, Hand, Puzzle, ShieldCheck, Shuffle } from 'lucide-react'
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
    bg: 'bg-[#e2f0e7]',
    iconBg: 'bg-[#b7d9c2]',
  },
  {
    href: '/kids/math',
    title: 'Math Dash',
    text: 'Solve as many sums as you can before the timer runs out.',
    icon: Calculator,
    bg: 'bg-[#fff0c9]',
    iconBg: 'bg-[#f5d77d]',
  },
  {
    href: '/kids/words',
    title: 'Word Scramble',
    text: 'Unscramble the letters to find the hidden word.',
    icon: Shuffle,
    bg: 'bg-[#e4e8f8]',
    iconBg: 'bg-[#c3ccef]',
  },
  {
    href: '/kids/learn',
    title: 'A to Z Fun Facts',
    text: 'Flip learning cards to discover amazing facts.',
    icon: BookOpen,
    bg: 'bg-[#f7e1df]',
    iconBg: 'bg-[#edbbb7]',
  },
  {
    href: '/kids/fingers',
    title: 'Finger Count',
    text: 'Show numbers with your fingers and learn by doing.',
    icon: Hand,
    bg: 'bg-[#e6eef3]',
    iconBg: 'bg-[#bfd8e5]',
  },
]

export default function KidsPage() {
  return (
    <main className="page-enter">
      <section className="relative overflow-hidden bg-[#eef4e8] px-5 py-14 md:px-9 md:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[#d7e8d4]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-[-5rem] left-[38%] size-44 rounded-full bg-[#f8df9f]/70" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5">
          <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
            Kids Zone
          </span>
          <h1 className="max-w-3xl text-balance font-serif text-5xl leading-[1.02] text-primary md:text-7xl">
            Learn, play and <em className="text-sage">shine.</em>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Quizzes, puzzles and games made for curious minds. Earn stars, beat your best score and learn something new
            every day.
          </p>
          <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-primary">
            <span className="grid size-7 place-items-center rounded-full bg-[#f5d77d] text-xs" aria-hidden="true">★</span>
            Choose an activity to get started
          </div>
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
              className="group flex min-h-52 flex-col justify-between gap-6 rounded-2xl border border-border/80 bg-card p-6 shadow-[0_5px_0_rgba(49,88,68,0.08)] transition-all hover:-translate-y-1 hover:border-sun hover:shadow-lg"
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
            {games.map(({ href, title, text, icon: Icon, bg, iconBg }) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-5 rounded-2xl p-6 shadow-[0_5px_0_rgba(49,88,68,0.08)] transition-transform hover:-translate-y-1 md:p-8 ${bg}`}
              >
                <span className={`grid size-16 shrink-0 place-items-center rounded-2xl text-primary shadow-sm ${iconBg}`}>
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
