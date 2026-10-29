'use client'

import { useActionState, useState } from 'react'
import { CheckCircle2, LocateFixed, Loader2 } from 'lucide-react'
import { submitFinderReport } from '@/app/actions/scan'
import { inputClass, labelClass } from '@/components/admin/field'

type Coords = { latitude: number; longitude: number }

export function FinderForm({ alertId, tagCode, childName }: { alertId: number; tagCode: string; childName: string }) {
  const [state, action, pending] = useActionState(submitFinderReport.bind(null, alertId, tagCode), undefined)
  const [coords, setCoords] = useState<Coords | null>(null)
  const [locating, setLocating] = useState(false)
  const [locError, setLocError] = useState<string | null>(null)

  function shareLocation() {
    if (!navigator.geolocation) {
      setLocError('Location is not available on this device.')
      return
    }
    setLocating(true)
    setLocError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        setLocating(false)
      },
      () => {
        setLocError('We could not get your location. You can still send the form.')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  if (state?.ok) {
    return (
      <section className="flex flex-col items-center gap-3 rounded-3xl bg-sage-soft p-6 text-center" role="status">
        <CheckCircle2 className="size-10 text-sage" aria-hidden="true" />
        <h2 className="font-serif text-2xl text-primary">Thank you</h2>
        <p className="leading-7 text-muted-foreground">
          {`Our team has your details and will contact you shortly to help get ${childName} home.`}
        </p>
      </section>
    )
  }

  return (
    <section aria-labelledby="finder-heading" className="rounded-3xl border border-border bg-card p-6">
      <h2 id="finder-heading" className="font-serif text-2xl text-primary">
        Let our team reach you
      </h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Share your contact so we can coordinate the safe return.
      </p>
      <form action={action} className="mt-5 flex flex-col gap-4">
        <div>
          <label htmlFor="finderName" className={labelClass}>
            Your name
          </label>
          <input id="finderName" name="finderName" required maxLength={80} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="finderPhone" className={labelClass}>
            Your phone
          </label>
          <input
            id="finderPhone"
            name="finderPhone"
            type="tel"
            required
            maxLength={30}
            autoComplete="tel"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            Where are you? (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={500}
            placeholder="e.g. Near the main gate of City Park"
            className={inputClass}
          />
        </div>
        {coords && (
          <>
            <input type="hidden" name="latitude" value={coords.latitude} />
            <input type="hidden" name="longitude" value={coords.longitude} />
          </>
        )}
        <button
          type="button"
          onClick={shareLocation}
          disabled={locating || coords !== null}
          className="flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-primary disabled:opacity-70"
        >
          {locating ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <LocateFixed className="size-4" aria-hidden="true" />
          )}
          {coords ? 'Location attached' : locating ? 'Finding you…' : 'Share my location'}
        </button>
        {locError && <p className="text-sm text-muted-foreground">{locError}</p>}
        {state?.error && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-5 py-4 font-bold text-primary-foreground disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Notify the team'}
        </button>
      </form>
    </section>
  )
}
