import { GameShell } from '@/components/kids/game-shell'
import { FingerNumberGame } from '@/components/kids/finger-number-game'

export const metadata = { title: 'Finger Numbers' }

export default function FingerNumbersPage() {
  return (
    <GameShell
      title="Finger Numbers"
      subtitle="Look at the number, show it with your fingers, and let the camera check your answer."
    >
      <FingerNumberGame />
    </GameShell>
  )
}
