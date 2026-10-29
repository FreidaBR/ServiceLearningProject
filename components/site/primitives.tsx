import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const tones = {
  primary: 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg',
  outline: 'border border-border bg-card text-foreground hover:border-primary hover:text-primary',
  light: 'bg-secondary text-primary hover:bg-card',
  sun: 'bg-sun text-primary hover:-translate-y-0.5 hover:shadow-lg',
} as const

export type Tone = keyof typeof tones

export function pillClass(tone: Tone = 'primary', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
    tones[tone],
    className,
  )
}

export function PillLink({
  href,
  children,
  tone = 'primary',
  className,
}: {
  href: string
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <Link href={href} className={pillClass(tone, className)}>
      {children}
    </Link>
  )
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        'mb-4 text-[11px] font-bold uppercase tracking-[.22em]',
        light ? 'text-primary-foreground/70' : 'text-muted-foreground',
      )}
    >
      {children}
    </p>
  )
}

export function PageHero({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string
  title: string
  accent?: string
  children?: ReactNode
}) {
  return (
    <section className="bg-secondary px-5 py-16 md:px-9 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[1.04] tracking-tight text-primary md:text-7xl">
          {title} {accent && <em className="text-sage">{accent}</em>}
        </h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>}
      </div>
    </section>
  )
}
