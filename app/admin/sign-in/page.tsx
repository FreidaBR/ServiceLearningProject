import { redirect } from 'next/navigation'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { getSession } from '@/lib/session'
import { AuthForm } from '@/components/admin/auth-form'

export default async function SignInPage() {
  const session = await getSession()
  if (session?.user) redirect('/admin')
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(user)
  if (count === 0) redirect('/admin/sign-up')
  return <AuthForm mode="sign-in" />
}
