import Link from 'next/link'
import { Plus } from 'lucide-react'
import { requireAdminPage } from '@/lib/session'
import { getAlertsFeed, getChildren } from '@/lib/safety-queries'
import { AdminHeader } from '@/components/admin/admin-header'
import { AlertsFeed } from '@/components/admin/alerts-feed'
import { ChildrenTable } from '@/components/admin/children-table'

export default async function AdminDashboard() {
  const admin = await requireAdminPage()
  const [feed, kids] = await Promise.all([getAlertsFeed(), getChildren()])
  const activeTags = kids.filter((k) => k.active).length

  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:px-9">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.22em] text-muted-foreground">Safety centre</p>
            <h1 className="mt-2 font-serif text-4xl text-primary md:text-5xl">{`Welcome, ${admin.name.split(' ')[0]}`}</h1>
          </div>
          <Link
            href="/admin/children/new"
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="size-4" aria-hidden="true" />
            Register child
          </Link>
        </div>

        <dl className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Children registered', value: kids.length },
            { label: 'Active tags', value: activeTags },
            { label: 'Total scans', value: kids.reduce((s, k) => s + k.scanCount, 0) },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-border bg-card p-6">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 font-serif text-4xl text-primary">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <AlertsFeed initial={feed} />
        <ChildrenTable kids={kids} />
      </main>
    </>
  )
}
