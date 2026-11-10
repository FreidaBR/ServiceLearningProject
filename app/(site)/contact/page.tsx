import type { Metadata } from 'next'
import { AtSign, Mail, Phone, ThumbsUp } from 'lucide-react'
import { PageHero } from '@/components/site/primitives'
import { contact } from '@/lib/site-data'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  const items = [
    { icon: Phone, label: 'Call us', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: AtSign, label: 'Instagram', value: contact.instagram },
  { icon: ThumbsUp, label: 'Facebook', value: contact.facebook },
  ]
  return (
    <main className="page-enter">
      <PageHero eyebrow="Get in touch" title="We would love to" accent="hear from you.">
        Volunteer, collaborate, enrol your child for a safety tag, or simply say hello.
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-14 sm:grid-cols-2 md:px-9 md:py-20 lg:grid-cols-4">
        {items.map(({ icon: Icon, label, value, href }) => {
          const body = (
            <>
              <span className="grid size-12 place-items-center rounded-full bg-sage-soft text-sage">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-xs uppercase tracking-[.16em] text-muted-foreground">{label}</p>
              <p className="mt-1 break-words font-semibold text-primary">{value}</p>
            </>
          )
          return href ? (
            <a key={label} href={href} className="rounded-3xl border border-border bg-card p-6 hover:border-primary">
              {body}
            </a>
          ) : (
            <div key={label} className="rounded-3xl border border-border bg-card p-6">
              {body}
            </div>
          )
        })}
      </section>
    </main>
  )
}
