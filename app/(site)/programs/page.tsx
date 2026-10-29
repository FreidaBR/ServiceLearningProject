import type { Metadata } from 'next'
import { PageHero } from '@/components/site/primitives'
import { initiativeGroups } from '@/lib/site-data'

export const metadata: Metadata = { title: 'Programs' }

const backgrounds = ['bg-accent', 'bg-secondary', 'bg-muted', 'bg-sage-soft', 'bg-sun-soft']

export default function ProgramsPage() {
  return (
    <main className="page-enter">
      <PageHero eyebrow="What we do" title="Many ways to" accent="care.">
        Our initiatives are shaped around community, inclusion and everyday needs. Each one begins with people willing
        to take part.
      </PageHero>
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:px-9 md:py-20">
        {initiativeGroups.map((group, i) => (
          <section key={group.name} className={`rounded-[2rem] p-6 md:p-8 ${backgrounds[i % backgrounds.length]}`}>
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="md:w-1/3">
                <p className="text-xs uppercase tracking-[.16em] text-muted-foreground">0{i + 1}</p>
                <h2 className="mt-2 font-serif text-3xl text-primary">{group.name}</h2>
              </div>
              <ul className="grid flex-1 gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-2xl bg-card px-5 py-4 font-medium text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>
    </main>
  )
}
