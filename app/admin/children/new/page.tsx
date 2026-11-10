import { requireAdminPage } from '@/lib/session'
import { AdminHeader } from '@/components/admin/admin-header'
import { ChildForm } from '@/components/admin/child-form'

export default async function NewChildPage() {
  const admin = await requireAdminPage()
  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="mx-auto max-w-3xl px-5 py-10 md:px-9">
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-muted-foreground">New safety tag</p>
        <h1 className="mt-2 font-serif text-4xl text-primary md:text-5xl">Register a child</h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          This information is shown to whoever scans the tag, so include only what a finder needs to get the child home safely.
        </p>
        <ChildForm />
      </main>
    </>
  )
}
