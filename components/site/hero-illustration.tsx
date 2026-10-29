export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[570px]">
      <div className="absolute -right-4 -top-7 size-28 rounded-full border border-[#c7a98a] md:-right-7 md:size-40" />
      <div className="relative overflow-hidden rounded-[48%_48%_20px_20px] bg-sage px-8 pt-12 shadow-[0_22px_45px_rgba(76,42,32,.13)]">
        <svg viewBox="0 0 540 490" role="img" aria-label="Illustration of a community gathering around a shared table" className="w-full">
          <path d="M0 388 Q130 334 250 385 T540 364 V490 H0Z" fill="#e4b99a" />
          <circle cx="271" cy="123" r="86" fill="#e3c39e" opacity=".85" />
          <path d="M90 367c8-94 60-135 111-135 56 0 85 52 82 135M264 365c0-100 44-151 98-151 66 0 99 54 103 151M165 391c6-57 42-89 91-89 52 0 80 33 88 89" fill="#f7ecda" />
          <path d="M91 270c9-35 36-56 70-51 36 5 53 37 44 71-28 23-81 29-114-20m160-30c13-37 44-53 78-42 34 11 45 46 28 78-31 16-81 12-106-36m-63 97c10-33 42-47 70-34 29 13 35 43 15 68-31 11-70-3-85-34" fill="#51261f" />
          <path d="M144 251c19 2 35 9 50 24m133-28c17 5 30 15 40 30m-169 86c18 4 34 13 44 27" stroke="#352a26" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M51 376h436" stroke="#51261f" strokeWidth="14" strokeLinecap="round" />
          <circle cx="270" cy="335" r="25" fill="#d58c5b" />
          <path d="M251 361h39l18 53h-76z" fill="#b75e47" />
          <path d="M230 325c2-17 14-28 29-26 17 1 25 16 20 30-12 15-39 15-49-4" fill="#40221e" />
          <path d="M72 392v90m395-90v90" stroke="#51261f" strokeWidth="12" strokeLinecap="round" />
          <path d="M123 357c-17 3-30 2-44-4m304-19c17 3 31 0 44-8" stroke="#d68f69" strokeWidth="14" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute -bottom-5 -left-3 rounded-2xl bg-background px-5 py-4 shadow-lg">
        <p className="font-serif text-2xl text-primary">Small acts.</p>
        <p className="text-xs text-muted-foreground">A stronger circle.</p>
      </div>
    </div>
  )
}
