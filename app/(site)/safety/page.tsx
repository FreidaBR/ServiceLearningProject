import type { Metadata } from 'next'
import { BellRing, MapPin, QrCode, ShieldCheck } from 'lucide-react'
import { PageHero, PillLink } from '@/components/site/primitives'
import { TagLookup } from '@/components/scan/tag-lookup'

export const metadata: Metadata = {
  title: 'Safety Tags',
  description: 'Every child in our programs gets a personal QR safety tag so a lost child can be returned home quickly.',
}

const steps = [
  {
    icon: QrCode,
    title: 'Every child gets a tag',
    body: 'Our team registers each child and prints a unique QR tag to clip on a bag, ID card or wristband.',
  },
  {
    icon: MapPin,
    title: 'A finder scans it',
    body: 'Anyone with a phone camera can scan the tag. No app needed. They see who to call and where to take the child.',
  },
  {
    icon: BellRing,
    title: 'Our team is alerted',
    body: 'Every scan instantly alerts our admin team, with the finder’s details and location if they choose to share it.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    body: 'Tags carry only a random code. No names or addresses are printed, and tags can be switched off at any time.',
  },
]

export default function SafetyPage() {
  return (
    <>
      <PageHero eyebrow="Child safety" title="Every child," accent="always findable.">
        <p>
          The People for Passion Safety Tag helps a lost child get home fast. One scan connects a kind stranger with
          the right contact person and notifies our team immediately.
        </p>
      </PageHero>
      <section className="px-5 py-16 md:px-9 md:py-24">
        <ol className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-sage-soft text-sage">
                  <step.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="font-serif text-3xl text-muted-foreground/50">{`0${i + 1}`}</span>
              </div>
              <h2 className="text-lg font-semibold text-primary">{step.title}</h2>
              <p className="leading-7 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        <div
          id="found-a-child"
          className="mx-auto mt-12 flex max-w-7xl scroll-mt-24 flex-col gap-8 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-end md:justify-between md:p-10"
        >
          <div className="flex flex-col items-start gap-4">
            <h2 className="font-serif text-3xl">Found a child with our tag?</h2>
            <p className="max-w-md text-primary-foreground/75">
              Point your phone camera at the QR code and follow the instructions on screen. No app needed.
            </p>
            <PillLink href="/contact" tone="sun">
              Contact our team
            </PillLink>
          </div>
          <TagLookup />
        </div>
      </section>
    </>
  )
}
