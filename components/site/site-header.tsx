'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HeartHandshake, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Kids Zone', href: '/kids' },
  { label: 'Safety Tags', href: '/safety' },
  { label: 'Contact', href: '/contact' },
]

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={cn('flex items-center gap-3', inverse ? 'text-primary-foreground' : 'text-primary')}>
      <span className="grid size-10 place-items-center rounded-full bg-sage-soft text-sage">
        <HeartHandshake className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <b className="block text-[15px] tracking-tight">People for Passion</b>
        <span className="text-[10px] uppercase tracking-[.19em] opacity-75">People. Purpose. Possibility.</span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-9">
        <Wordmark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(link.href) ? 'text-primary' : 'text-muted-foreground',
                link.href === '/kids' && 'rounded-full bg-sun-soft px-3 py-1.5 text-primary',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Admin
          </Link>
        </nav>
        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          className="rounded-full p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          {[...links, { label: 'Admin', href: '/admin' }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 font-medium text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
