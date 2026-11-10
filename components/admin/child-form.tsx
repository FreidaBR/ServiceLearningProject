'use client'

import { useActionState } from 'react'
import { createChild } from '@/app/actions/safety'
import { inputClass, labelClass } from '@/components/admin/field'

function Field({
  name,
  label,
  required,
  type = 'text',
  hint,
  max = 120,
}: {
  name: string
  label: string
  required?: boolean
  type?: string
  hint?: string
  max?: number
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <input id={name} name={name} type={type} required={required} maxLength={max} className={inputClass} />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function ChildForm() {
  const [state, action, pending] = useActionState(createChild, undefined)

  return (
    <form action={action} className="mt-8 flex flex-col gap-8 rounded-3xl border border-border bg-card p-6 md:p-8">
      <fieldset className="grid gap-5 sm:grid-cols-[1fr_140px]">
        <legend className="mb-4 text-lg font-semibold text-primary">Child</legend>
        <Field name="childName" label="Child's name" required max={80} hint="First name is usually enough." />
        <div>
          <label htmlFor="age" className={labelClass}>
            Age
          </label>
          <input id="age" name="age" type="number" min={1} max={18} className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-semibold text-primary">Guardian</legend>
        <div className="sm:col-span-2">
          <Field name="guardianName" label="Guardian name" required max={80} />
        </div>
        <Field name="guardianPhone" label="Primary phone" type="tel" required max={30} />
        <Field name="altPhone" label="Alternate phone" type="tel" max={30} />
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="mb-4 text-lg font-semibold text-primary">Safe drop-off</legend>
        <Field name="dropOffLocation" label="Drop-off location name" required hint="e.g. People for Passion Centre, Sunrise School" />
        <Field name="dropOffAddress" label="Address" max={240} hint="Used for the directions link." />
        <div>
          <label htmlFor="medicalNotes" className={labelClass}>
            Care or medical notes
          </label>
          <textarea id="medicalNotes" name="medicalNotes" rows={3} maxLength={500} className={inputClass} placeholder="Allergies, conditions, how to comfort them…" />
        </div>
      </fieldset>

      {state?.error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground disabled:opacity-60"
      >
        {pending ? 'Saving…' : 'Create safety tag'}
      </button>
    </form>
  )
}
