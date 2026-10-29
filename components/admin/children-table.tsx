'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { QrCode } from 'lucide-react'
import { setChildActive } from '@/app/actions/safety'
import { cn } from '@/lib/utils'

type Kid = {
  id: number
  tagCode: string
  childName: string
  age: number | null
  guardianName: string
  guardianPhone: string
  dropOffLocation: string
  active: boolean
  scanCount: number
}

export function ChildrenTable({ kids }: { kids: Kid[] }) {
  const [pending, startTransition] = useTransition()

  return (
    <section aria-labelledby="kids-heading" className="rounded-3xl border border-border bg-card">
      <div className="border-b border-border p-6">
        <h2 id="kids-heading" className="text-lg font-semibold text-primary">
          Registered children
        </h2>
      </div>
      {kids.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="text-muted-foreground">No children registered yet.</p>
          <Link href="/admin/children/new" className="font-semibold text-primary underline underline-offset-4">
            Register the first child
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-semibold">Child</th>
                <th className="px-6 py-3 font-semibold">Guardian</th>
                <th className="px-6 py-3 font-semibold">Drop-off</th>
                <th className="px-6 py-3 font-semibold">Scans</th>
                <th className="px-6 py-3 font-semibold">Tag</th>
                <th className="px-6 py-3 font-semibold">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {kids.map((k) => (
                <tr key={k.id}>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-primary">{k.childName}</p>
                    {k.age && <p className="text-muted-foreground">{`${k.age} yrs`}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <p>{k.guardianName}</p>
                    <p className="text-muted-foreground">{k.guardianPhone}</p>
                  </td>
                  <td className="px-6 py-4">{k.dropOffLocation}</td>
                  <td className="px-6 py-4">{k.scanCount}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => startTransition(() => setChildActive(k.id, !k.active))}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-bold disabled:opacity-50',
                        k.active ? 'bg-sage-soft text-sage' : 'bg-muted text-muted-foreground',
                      )}
                      aria-label={`${k.active ? 'Deactivate' : 'Activate'} tag for ${k.childName}`}
                    >
                      {k.active ? 'Active' : 'Off'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/children/${k.id}/tag`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-semibold text-primary hover:border-primary"
                    >
                      <QrCode className="size-4" aria-hidden="true" />
                      Print tag
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
