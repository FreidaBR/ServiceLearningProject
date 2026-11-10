import { GameShell } from '@/components/kids/game-shell'
import { MathGame } from '@/components/kids/math-game'

export const metadata = { title: 'Math Dash' }

export default function MathPage() {
  return (
    <GameShell title="Math Dash" subtitle="Answer as many sums as you can in 45 seconds.">
      <MathGame />
    </GameShell>
  )
}
