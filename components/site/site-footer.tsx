import Link from 'next/link'
import { contact } from '@/lib/site-data'
import { Wordmark } from './site-header'

export function SiteFooter() {
  return (
    <footer className="no-print bg-primary px-5 py-12 text-primary-foreground md:px-9">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark inverse />
          <p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/75">
            A community-led non-profit creating space for care, dignity and shared possibility.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[.2em] text-primary-foreground/60">Find your way</p>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/about">Our story</Link>
            <Link href="/programs">Our initiatives</Link>
            <Link href="/contact">Get in touch</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[.2em] text-primary-foreground/60">For carers</p>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/kids">Kids Zone</Link>
            <Link href="/safety">Child Safety Tags</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[.2em] text-primary-foreground/60">Say hello</p>
          <p className="text-sm">{contact.phone}</p>
          <p className="mt-2 text-sm">{contact.email}</p>
          <p className="mt-4 text-xs text-primary-foreground/60">
            Instagram · {contact.instagram}
            <br />
            Facebook · {contact.facebook}
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-primary-foreground/20 pt-5 text-xs text-primary-foreground/60">
        © People for Passion · Founded 2019
      </div>
    </footer>
  )
}
