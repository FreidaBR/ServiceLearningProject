import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

export function GameShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <main className="page-enter min-h-[70dvh] bg-sun-soft/50 px-5 py-10 md:px-9 md:py-14">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/kids"
          className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:shadow"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to Kids Zone
        </Link>
        <h1 className="mt-6 font-serif text-4xl text-primary md:text-5xl">{title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  )
}

export function Stars({ count, max }: { count: number; max: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`size-8 ${i < count ? 'text-sun' : 'text-border'}`} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
          />
        </svg>
      ))}
    </div>
  )
}
