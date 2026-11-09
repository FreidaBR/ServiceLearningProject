import type { Metadata } from 'next'
import { GameShell } from '@/components/kids/game-shell'
import { FingerCountGame } from '@/components/kids/finger-count-game'

export const metadata: Metadata = {
  title: 'Finger Count | Kids Zone',
  description: 'Learn numbers by showing them with your fingers using your camera.',
}

export default function FingersPage() {
  return (
    <GameShell title="Finger Count" subtitle="Show the number with your fingers and learn by doing.">
      <FingerCountGame />
    </GameShell>
  )
}
