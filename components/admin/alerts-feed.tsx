'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import useSWR from 'swr'
import { Bell, BellRing, Check, MapPin, Phone } from 'lucide-react'
import { setAlertStatus } from '@/app/actions/safety'
import type { AlertRow } from '@/lib/safety-queries'
import { cn } from '@/lib/utils'

type Feed = { alerts: AlertRow[]; newCount: number }

const fetcher = async (url: string): Promise<Feed> => {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to load alerts')
  return res.json()
}

function chime() {
  try {
    const ctx = new AudioContext()
    ;[660, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.18)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.3)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.18)
      osc.stop(ctx.currentTime + i * 0.18 + 0.3)
    })
  } catch {}
}

const statusStyles: Record<string, string> = {
  new: 'bg-destructive/10 text-destructive',
  acknowledged: 'bg-sun-soft text-primary',
  resolved: 'bg-sage-soft text-sage',
}

export function AlertsFeed({ initial }: { initial: Feed }) {
  const { data, mutate } = useSWR('/api/alerts', fetcher, { fallbackData: initial, refreshInterval: 8000 })
  const [pending, startTransition] = useTransition()
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default')
  const seenIds = useRef(new Set(initial.alerts.map((a) => a.id)))

  useEffect(() => {
    setPermission(typeof Notification === 'undefined' ? 'unsupported' : Notification.permission)
  }, [])

  useEffect(() => {
    const fresh = data.alerts.filter((a) => !seenIds.current.has(a.id))
    fresh.forEach((a) => seenIds.current.add(a.id))
    if (fresh.length === 0) return
    chime()
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      fresh.forEach((a) => new Notification(`Safety tag scanned: ${a.childName}`, { body: 'Open the dashboard to respond.' }))
    }
  }, [data.alerts])

  useEffect(() => {
    document.title = data.newCount > 0 ? `(${data.newCount}) New scan alert · Admin` : 'Admin · People for Passion'
  }, [data.newCount])

  function update(id: number, status: 'acknowledged' | 'resolved') {
    startTransition(async () => {
      await setAlertStatus(id, status)
      await mutate()
    })
  }

  return (
    <section aria-labelledby="alerts-heading" className="rounded-3xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'grid size-11 place-items-center rounded-2xl',
              data.newCount > 0 ? 'bg-destructive/10 text-destructive' : 'bg-sage-soft text-sage',
            )}
          >
            {data.newCount > 0 ? <BellRing className="size-5" aria-hidden="true" /> : <Bell className="size-5" aria-hidden="true" />}
          </span>
          <div>
            <h2 id="alerts-heading" className="text-lg font-semibold text-primary">
              Scan alerts
            </h2>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {data.newCount > 0 ? `${data.newCount} need attention` : 'All clear'}
              {' · updates live'}
            </p>
          </div>
        </div>
        {permission === 'default' && (
          <button
            type="button"
            onClick={async () => setPermission(await Notification.requestPermission())}
            className="self-start rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:border-primary"
          >
            Enable desktop alerts
          </button>
        )}
      </div>

      {data.alerts.length === 0 ? (
        <p className="p-10 text-center text-muted-foreground">No scans yet. Alerts appear here the moment a tag is scanned.</p>
      ) : (
        <ul className="divide-y divide-border">
          {data.alerts.map((a) => (
            <li key={a.id} className={cn('flex flex-col gap-4 p-6 lg:flex-row lg:items-start lg:justify-between', a.status === 'new' && 'bg-destructive/[.03]')}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-primary">{a.childName}</span>
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold capitalize', statusStyles[a.status])}>
                    {a.status}
                  </span>
                  <time className="text-sm text-muted-foreground" dateTime={a.createdAt}>
                    {new Date(a.createdAt).toLocaleString()}
                  </time>
                </div>
                {a.finderName ? (
                  <p className="text-sm leading-6 text-foreground">
                    {'Found by '}
                    <b>{a.finderName}</b>
                    {' · '}
                    <a href={`tel:${a.finderPhone}`} className="inline-flex items-center gap-1 font-semibold text-sage underline-offset-4 hover:underline">
                      <Phone className="size-3.5" aria-hidden="true" />
                      {a.finderPhone}
                    </a>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Tag scanned. Finder has not shared contact details yet.</p>
                )}
                {a.message && <p className="rounded-2xl bg-muted px-4 py-2 text-sm leading-6">{a.message}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{`Guardian: ${a.guardianName} · ${a.guardianPhone}`}</span>
                  {a.latitude !== null && a.longitude !== null && (
                    <a
                      href={`https://www.google.com/maps?q=${a.latitude},${a.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      <MapPin className="size-3.5" aria-hidden="true" />
                      View finder location
                    </a>
                  )}
                </div>
              </div>
              {a.status !== 'resolved' && (
                <div className="flex shrink-0 gap-2">
                  {a.status === 'new' && (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => update(a.id, 'acknowledged')}
                      className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:border-primary disabled:opacity-50"
                    >
                      Acknowledge
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => update(a.id, 'resolved')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sage px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                  >
                    <Check className="size-4" aria-hidden="true" />
                    Child is safe
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
