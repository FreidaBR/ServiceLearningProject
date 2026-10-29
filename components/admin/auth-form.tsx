'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { authClient } from '@/lib/auth-client'
import { inputClass, labelClass } from '@/components/admin/field'
import { Wordmark } from '@/components/site/site-header'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email'))
    const password = String(form.get('password'))
    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name: String(form.get('name')) })
      : await authClient.signIn.email({ email, password })
    setPending(false)
    if (error) {
      setError(isSignUp ? 'Could not create the admin account.' : 'Invalid email or password.')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <Wordmark />
        <h1 className="mt-8 font-serif text-4xl text-primary">{isSignUp ? 'Create admin' : 'Admin sign in'}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {isSignUp
            ? 'Set up the first administrator account. Registration closes after this.'
            : 'Manage safety tags and respond to scan alerts.'}
        </p>
        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <input id="name" name="name" required autoComplete="name" className={inputClass} />
            </div>
          )}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              className={inputClass}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground disabled:opacity-60"
          >
            {pending ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="font-medium text-primary underline-offset-4 hover:underline">
            Back to website
          </Link>
        </p>
      </div>
    </main>
  )
}
