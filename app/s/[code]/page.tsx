import type { Metadata } from 'next'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { HeartHandshake, HeartPulse, MapPin, Phone } from 'lucide-react'
import { db } from '@/lib/db'
import { children, scanAlerts } from '@/lib/db/schema'
import { FinderForm } from '@/components/scan/finder-form'

export const metadata: Metadata = {
  title: 'Safety Tag',
  robots: { index: false, follow: false },
}

const PREVIEW_BOT = /bot|crawl|spider|preview|facebookexternalhit|whatsapp|slack|telegram|discord/i

export default async function ScanPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const tagCode = code.toUpperCase().slice(0, 20)

  const [child] = await db
    .select()
    .from(children)
    .where(and(eq(children.tagCode, tagCode), eq(children.active, true)))
  if (!child) notFound()

  const userAgent = (await headers()).get('user-agent') ?? ''
  let alertId: number | null = null
  if (!PREVIEW_BOT.test(userAgent)) {
    const [alert] = await db
      .insert(scanAlerts)
      .values({ childId: child.id, userAgent: userAgent.slice(0, 300) })
      .returning({ id: scanAlerts.id })
    alertId = alert.id
  }

  const mapQuery = encodeURIComponent(child.dropOffAddress || child.dropOffLocation)
  const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`

  return (
    <main className="min-h-dvh bg-secondary px-4 py-8">
      <div className="mx-auto flex max-w-md flex-col gap-5">
        <header className="flex items-center gap-3 text-primary">
          <span className="grid size-10 place-items-center rounded-full bg-sage-soft text-sage">
            <HeartHandshake className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">People for Passion</p>
            <p className="text-xs text-muted-foreground">Child Safety Tag</p>
          </div>
        </header>

        <section className="rounded-3xl bg-primary p-6 text-primary-foreground">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-foreground/70">
            Thank you for helping
          </p>
          <h1 className="mt-3 text-balance font-serif text-4xl leading-tight">
            {"You've found "}
            <em className="text-sun">{child.childName}</em>
          </h1>
          <p className="mt-3 leading-7 text-primary-foreground/80">
            {child.age ? `${child.childName} is ${child.age} years old. ` : ''}
            Please stay with them and call their guardian. Our team has been notified of this scan.
          </p>
        </section>

        <section aria-labelledby="call-heading" className="rounded-3xl border border-border bg-card p-6">
          <h2 id="call-heading" className="text-sm font-bold uppercase tracking-[.16em] text-muted-foreground">
            Call guardian
          </h2>
          <p className="mt-2 text-lg font-semibold text-primary">{child.guardianName}</p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={tel(child.guardianPhone)}
              className="flex items-center justify-center gap-2 rounded-full bg-sage px-5 py-4 text-base font-bold text-primary-foreground"
            >
              <Phone className="size-5" aria-hidden="true" />
              {`Call ${child.guardianPhone}`}
            </a>
            {child.altPhone && (
              <a
                href={tel(child.altPhone)}
                className="flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-semibold text-primary"
              >
                <Phone className="size-4" aria-hidden="true" />
                {`Alternate: ${child.altPhone}`}
              </a>
            )}
          </div>
        </section>

        <section aria-labelledby="drop-heading" className="rounded-3xl border border-border bg-card p-6">
          <h2 id="drop-heading" className="text-sm font-bold uppercase tracking-[.16em] text-muted-foreground">
            Safe drop-off point
          </h2>
          <p className="mt-2 text-lg font-semibold text-primary">{child.dropOffLocation}</p>
          {child.dropOffAddress && <p className="mt-1 leading-7 text-muted-foreground">{child.dropOffAddress}</p>}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sun-soft px-4 py-2.5 text-sm font-semibold text-primary"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Get directions
          </a>
        </section>

        {child.medicalNotes && (
          <section
            aria-labelledby="med-heading"
            className="rounded-3xl border-2 border-destructive/40 bg-card p-6"
          >
            <h2
              id="med-heading"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-[.16em] text-destructive"
            >
              <HeartPulse className="size-4" aria-hidden="true" />
              Important care notes
            </h2>
            <p className="mt-2 leading-7 text-foreground">{child.medicalNotes}</p>
          </section>
        )}

        {alertId !== null && <FinderForm alertId={alertId} tagCode={tagCode} childName={child.childName} />}

        <p className="pb-4 text-center text-xs leading-5 text-muted-foreground">
          {'In an emergency, call your local emergency number first.'}
        </p>
      </div>
    </main>
  )
}
