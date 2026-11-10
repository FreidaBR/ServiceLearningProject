'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Wordmark } from '@/components/site/site-header'

export function AdminHeader({ email }: { email: string }) {
  const router = useRouter()

  async function signOut() {
    await authClient.signOut()
    router.push('/admin/sign-in')
    router.refresh()
  }

  return (
    <header className="no-print border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-9">
        <div className="flex items-center gap-6">
          <Wordmark />
          <nav className="hidden gap-5 text-sm font-medium md:flex" aria-label="Admin navigation">
            <Link href="/admin" className="text-primary">
              Dashboard
            </Link>
            <Link href="/admin/children/new" className="text-muted-foreground hover:text-primary">
              Register child
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">{email}</span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:border-primary"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
