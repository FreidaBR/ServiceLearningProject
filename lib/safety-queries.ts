import 'server-only'
import { desc, eq, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { children, scanAlerts } from '@/lib/db/schema'

export type AlertRow = {
  id: number
  childId: number
  childName: string
  tagCode: string
  guardianName: string
  guardianPhone: string
  finderName: string | null
  finderPhone: string | null
  message: string | null
  latitude: number | null
  longitude: number | null
  status: string
  createdAt: string
  updatedAt: string
}

export async function getAlertsFeed() {
  const rows = await db
    .select({
      id: scanAlerts.id,
      childId: scanAlerts.childId,
      childName: children.childName,
      tagCode: children.tagCode,
      guardianName: children.guardianName,
      guardianPhone: children.guardianPhone,
      finderName: scanAlerts.finderName,
      finderPhone: scanAlerts.finderPhone,
      message: scanAlerts.message,
      latitude: scanAlerts.latitude,
      longitude: scanAlerts.longitude,
      status: scanAlerts.status,
      createdAt: scanAlerts.createdAt,
      updatedAt: scanAlerts.updatedAt,
    })
    .from(scanAlerts)
    .innerJoin(children, eq(children.id, scanAlerts.childId))
    .orderBy(desc(scanAlerts.createdAt))
    .limit(50)

  const alerts: AlertRow[] = rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }))
  return { alerts, newCount: alerts.filter((a) => a.status === 'new').length }
}

export async function getChildren() {
  return db
    .select({
      id: children.id,
      tagCode: children.tagCode,
      childName: children.childName,
      age: children.age,
      guardianName: children.guardianName,
      guardianPhone: children.guardianPhone,
      dropOffLocation: children.dropOffLocation,
      active: children.active,
      createdAt: children.createdAt,
      scanCount: sql<number>`(SELECT count(*)::int FROM ${scanAlerts} WHERE ${scanAlerts.childId} = ${children.id})`,
    })
    .from(children)
    .orderBy(desc(children.createdAt))
}
