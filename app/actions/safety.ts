'use server'

import { randomBytes } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { children, scanAlerts } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/session'

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function makeTagCode() {
  const bytes = randomBytes(10)
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

function field(form: FormData, name: string, max: number, required = false) {
  const value = String(form.get(name) ?? '').trim().slice(0, max)
  if (required && !value) throw new Error(`${name} is required`)
  return value || null
}

export type FormState = { error?: string } | undefined

export async function createChild(_prev: FormState, form: FormData): Promise<FormState> {
  const admin = await requireAdmin()
  let id: number
  try {
    const ageRaw = Number(form.get('age'))
    const [row] = await db
      .insert(children)
      .values({
        tagCode: makeTagCode(),
        childName: field(form, 'childName', 80, true)!,
        age: Number.isInteger(ageRaw) && ageRaw > 0 && ageRaw < 19 ? ageRaw : null,
        guardianName: field(form, 'guardianName', 80, true)!,
        guardianPhone: field(form, 'guardianPhone', 30, true)!,
        altPhone: field(form, 'altPhone', 30),
        dropOffLocation: field(form, 'dropOffLocation', 120, true)!,
        dropOffAddress: field(form, 'dropOffAddress', 240),
        medicalNotes: field(form, 'medicalNotes', 500),
        createdBy: admin.id,
      })
      .returning({ id: children.id })
    id = row.id
  } catch (e) {
    return { error: e instanceof Error && e.message.endsWith('is required') ? 'Please fill in all required fields.' : 'Could not save this child. Please try again.' }
  }
  revalidatePath('/admin')
  redirect(`/admin/children/${id}/tag`)
}

export async function setChildActive(id: number, active: boolean) {
  await requireAdmin()
  await db.update(children).set({ active }).where(eq(children.id, id))
  revalidatePath('/admin')
}

export async function setAlertStatus(id: number, status: 'new' | 'acknowledged' | 'resolved') {
  await requireAdmin()
  await db.update(scanAlerts).set({ status, updatedAt: new Date() }).where(eq(scanAlerts.id, id))
  revalidatePath('/admin')
}
