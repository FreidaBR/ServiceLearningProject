'use server'

import { and, eq, gt } from 'drizzle-orm'
import { db } from '@/lib/db'
import { children, scanAlerts } from '@/lib/db/schema'

export type FinderState = { ok?: boolean; error?: string } | undefined

const REPORT_WINDOW_MS = 6 * 60 * 60 * 1000

function coord(value: FormDataEntryValue | null, limit: number) {
  if (value === null || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) && Math.abs(n) <= limit ? n : null
}

export async function submitFinderReport(
  alertId: number,
  tagCode: string,
  _prev: FinderState,
  form: FormData,
): Promise<FinderState> {
  const finderName = String(form.get('finderName') ?? '').trim().slice(0, 80)
  const finderPhone = String(form.get('finderPhone') ?? '').trim().slice(0, 30)
  const message = String(form.get('message') ?? '').trim().slice(0, 500)
  if (!finderName || !finderPhone) return { error: 'Please share your name and phone number.' }

  const [match] = await db
    .select({ id: scanAlerts.id })
    .from(scanAlerts)
    .innerJoin(children, eq(children.id, scanAlerts.childId))
    .where(
      and(
        eq(scanAlerts.id, alertId),
        eq(children.tagCode, tagCode),
        gt(scanAlerts.createdAt, new Date(Date.now() - REPORT_WINDOW_MS)),
      ),
    )
  if (!match) return { error: 'This link has expired. Please scan the tag again.' }

  await db
    .update(scanAlerts)
    .set({
      finderName,
      finderPhone,
      message: message || null,
      latitude: coord(form.get('latitude'), 90),
      longitude: coord(form.get('longitude'), 180),
      status: 'new',
      updatedAt: new Date(),
    })
    .where(eq(scanAlerts.id, alertId))

  return { ok: true }
}
