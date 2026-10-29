import Link from 'next/link'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import QRCode from 'qrcode'
import { ArrowLeft, HeartHandshake } from 'lucide-react'
import { db } from '@/lib/db'
import { children } from '@/lib/db/schema'
import { requireAdminPage, siteOrigin } from '@/lib/session'
import { AdminHeader } from '@/components/admin/admin-header'
import { PrintButton } from '@/components/admin/print-button'

export default async function TagPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminPage()
  const id = Number((await params).id)
  if (!Number.isInteger(id)) notFound()
  const [child] = await db.select().from(children).where(eq(children.id, id))
  if (!child) notFound()

  const scanUrl = `${await siteOrigin()}/s/${child.tagCode}`
  const qrSvg = await QRCode.toString(scanUrl, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'H',
    color: { dark: '#1f3b2f', light: '#ffffff' },
  })

  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-5 py-10 md:px-9">
        <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Dashboard
            </Link>
            <h1 className="mt-2 font-serif text-4xl text-primary">{`${child.childName}'s safety tag`}</h1>
          </div>
          <PrintButton />
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <article className="w-[320px] shrink-0 overflow-hidden rounded-[28px] border-2 border-primary bg-white text-[#1f3b2f] shadow-lg print:shadow-none">
            <div className="flex items-center gap-2 bg-primary px-5 py-3 text-primary-foreground">
              <HeartHandshake className="size-5" aria-hidden="true" />
              <span className="text-sm font-bold">People for Passion</span>
            </div>
            <div className="flex flex-col items-center gap-4 px-6 py-6 text-center">
              <p className="font-serif text-2xl leading-tight">{"If I'm lost, please scan me"}</p>
              <div
                className="size-52 [&_svg]:size-full"
                role="img"
                aria-label={`QR code linking to ${scanUrl}`}
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p className="text-xs leading-5 opacity-80">Use your phone camera. No app needed.</p>
              <p className="rounded-full bg-[#f4efe3] px-3 py-1 font-mono text-xs tracking-[.2em]">{child.tagCode}</p>
            </div>
          </article>

          <div className="no-print flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 text-sm leading-6">
            <h2 className="text-lg font-semibold text-primary">How to use</h2>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Print on card stock or sticker paper and laminate if possible.</li>
              <li>Attach to the child’s bag, ID lanyard or wristband.</li>
              <li>No personal details are printed - only a random code.</li>
              <li>You can switch the tag off from the dashboard at any time.</li>
            </ul>
            <p className="break-all text-xs text-muted-foreground">
              {'Scan link: '}
              <a href={scanUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">
                {scanUrl}
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
