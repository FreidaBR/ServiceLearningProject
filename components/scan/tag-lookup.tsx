'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export function TagLookup() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (clean.length < 4) {
      setError('Please enter the code printed under the QR code.')
      return
    }
    setError(null)
    router.push(`/s/${clean}`)
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 md:max-w-sm" noValidate>
      <label htmlFor="tag-code" className="text-sm font-semibold text-primary-foreground/90">
        {"Camera not working? Type the tag code"}
      </label>
      <div className="flex gap-2">
        <input
          id="tag-code"
          name="tag-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. 7KQ2MXAB"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={20}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'tag-code-error' : undefined}
          className="min-w-0 flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 font-mono tracking-[.15em] text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-sun"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-full bg-sun px-5 py-3 text-sm font-bold text-primary transition-opacity hover:opacity-90"
        >
          Find
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p id="tag-code-error" role="alert" className="text-sm text-sun">
          {error}
        </p>
      )}
    </form>
  )
}
