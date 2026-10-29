import { getSession } from '@/lib/session'
import { getAlertsFeed } from '@/lib/safety-queries'

export async function GET() {
  const session = await getSession()
  if (!session?.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await getAlertsFeed(), { headers: { 'Cache-Control': 'no-store' } })
}
