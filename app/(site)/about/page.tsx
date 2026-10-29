import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, PageHero, PillLink } from '@/components/site/primitives'
import { mission, vision } from '@/lib/site-data'

export const metadata: Metadata = { title: 'About' }

const focus = [
  'Women and girls',
  'Children',
  'Specially-abled communities',
  'LGBTQIA+',
  'Environment',
  'Underserved communities',
  'Animal welfare',
  'Civic issues',
  'Community development',
]

export default function AboutPage() {
  return (
    <main className="page-enter">
      <PageHero eyebrow="Who we are" title="People make" accent="possibility.">
        People for Passion is a registered non-profit founded by Harshitha Srinivas in 2019, working with volunteers and
        community members to support marginalized and underserved communities.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-9 md:py-24">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="font-serif text-4xl text-primary md:text-5xl">A steady commitment to community.</h2>
          <p className="mt-5 leading-8 text-muted-foreground">
            Founded by Harshitha Srinivas in 2019, People for Passion set out to support women and children who are in
            need. In 2020, community initiatives continued, with people coming together around practical acts of
            service.
          </p>
          <p className="mt-6 font-semibold text-primary">Harshitha Srinivas - Founder, People for Passion</p>
          <div className="mt-8 flex gap-5 border-l-2 border-sage pl-5">
            <div>
              <p className="font-serif text-3xl text-primary">2019</p>
              <p className="mt-1 text-sm text-muted-foreground">Founded</p>
            </div>
            <div className="h-14 w-px bg-border" />
            <div>
              <p className="font-serif text-3xl text-primary">2020</p>
              <p className="mt-1 text-sm text-muted-foreground">Community initiatives continued</p>
            </div>
          </div>
        </div>
        <div>
          <Eyebrow>Who we focus on</Eyebrow>
          <ul className="grid gap-2 sm:grid-cols-2">
            {focus.map((item) => (
              <li key={item} className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-accent px-5 py-16 md:px-9 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-card p-8 md:p-12">
            <Eyebrow>Our mission</Eyebrow>
            <p className="font-serif text-3xl leading-snug text-accent-foreground">{mission}</p>
          </div>
          <div className="rounded-[2rem] bg-sage-soft p-8 md:p-12">
            <Eyebrow>Our vision</Eyebrow>
            <p className="font-serif text-3xl leading-snug text-accent-foreground">{vision}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-9 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-serif text-4xl text-primary md:text-5xl">
            Service is not a spotlight. It is a way of being together.
          </h2>
          <PillLink href="/contact">
            Be part of it <ArrowRight className="size-4" aria-hidden="true" />
          </PillLink>
        </div>
      </section>
    </main>
  )
}
