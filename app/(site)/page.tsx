import Link from 'next/link'
import { ArrowRight, Gamepad2, QrCode, ShieldCheck, Sparkles } from 'lucide-react'
import { Eyebrow, PillLink } from '@/components/site/primitives'
import { HeroIllustration } from '@/components/site/hero-illustration'
import { initiativeGroups } from '@/lib/site-data'

const stats = [
  ['40+', 'Events and initiatives'],
  ['40+', 'Volunteers'],
  ['10+', 'Core team members'],
  ['1000+', 'People supported through food drive'],
]

export default function HomePage() {
  return (
    <main className="page-enter">
      <section className="relative overflow-hidden bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.02fr_.98fr] md:px-9 md:pb-24 md:pt-24">
          <div>
            <Eyebrow>A community that shows up</Eyebrow>
            <h1 className="max-w-[680px] text-balance font-serif text-[clamp(3rem,7vw,6.2rem)] leading-[.99] tracking-[-.04em] text-primary">
              Making a Difference, Together.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground md:text-lg">
              People for Passion works towards creating positive change by supporting women, children,
              specially-abled communities, the LGBTQIA+ community, environmental causes and underserved communities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href="/contact">
                Become a Volunteer <ArrowRight className="size-4" aria-hidden="true" />
              </PillLink>
              <PillLink href="/programs" tone="outline">
                Explore Our Programs
              </PillLink>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">Founded by Harshitha Srinivas in 2019</p>
          </div>
          <HeroIllustration />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-9 md:py-24">
        <div className="grid gap-9 border-b border-border pb-12 md:grid-cols-[.75fr_1.25fr]">
          <div>
            <Eyebrow>Why we gather</Eyebrow>
            <h2 className="max-w-md font-serif text-4xl leading-tight text-primary md:text-5xl">
              A little care can change the shape of a day.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              We believe meaningful service starts by listening. From sharing essentials to making room for inclusion,
              our community works side by side to help people feel seen and supported.
            </p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
              More about us <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-3xl border border-border bg-muted px-6 py-7">
              <p className="font-serif text-4xl text-primary">{value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Organization-reported figures.</p>
      </section>

      <section className="px-5 pb-16 md:px-9 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <Link
            href="/kids"
            className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-sun-soft p-8 md:p-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="size-3.5" aria-hidden="true" /> New
              </span>
              <h2 className="mt-5 font-serif text-4xl text-primary">Kids Zone</h2>
              <p className="mt-3 max-w-sm leading-7 text-muted-foreground">
                Quizzes, memory games, quick maths and word puzzles - learning that feels like play.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-primary">
              <Gamepad2 className="size-5" aria-hidden="true" /> Start playing
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="/safety"
            className="group flex flex-col justify-between gap-10 rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="size-3.5" aria-hidden="true" /> Child safety
              </span>
              <h2 className="mt-5 font-serif text-4xl">Safety QR Tags</h2>
              <p className="mt-3 max-w-sm leading-7 text-primary-foreground/80">
                Every child gets a personal QR tag. If they are ever lost, anyone can scan it to reach a trusted adult -
                and our team is alerted instantly.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold">
              <QrCode className="size-5" aria-hidden="true" /> How it works
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-accent px-5 py-16 md:px-9 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <Eyebrow>Care takes many forms</Eyebrow>
              <h2 className="max-w-sm font-serif text-4xl leading-tight text-accent-foreground md:text-5xl">
                There is room for everyone in this work.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {initiativeGroups.slice(0, 4).map((g, i) => (
                <Link
                  key={g.name}
                  href="/programs"
                  className={`group flex items-center justify-between rounded-2xl p-5 ${i % 2 ? 'bg-sage-soft' : 'bg-card'}`}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[.16em] text-sage">0{i + 1}</p>
                    <h3 className="mt-2 font-serif text-2xl text-accent-foreground">{g.name}</h3>
                  </div>
                  <ArrowRight
                    className="size-4 -rotate-45 text-sage transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1fr_.9fr] md:px-9 md:py-24">
        <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-12">
          <Eyebrow light>A note from our community</Eyebrow>
          <p className="font-serif text-3xl leading-snug md:text-4xl">
            {'"Volunteers do not necessarily have the time; they just have the Heart."'}
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <Eyebrow>Make a place for care</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            Your time, your skills, your kindness.
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
            Every helping hand adds to what a community can do. If you would like to volunteer, collaborate or simply
            learn more, we would love to hear from you.
          </p>
          <div className="mt-7">
            <PillLink href="/contact">
              Join Us <ArrowRight className="size-4" aria-hidden="true" />
            </PillLink>
          </div>
        </div>
      </section>
    </main>
  )
}
