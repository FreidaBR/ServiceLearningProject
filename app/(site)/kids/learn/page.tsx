import { GameShell } from '@/components/kids/game-shell'
import { LearnCards } from '@/components/kids/learn-cards'

export const metadata = { title: 'A to Z Fun Facts' }

export default function LearnPage() {
  return (
    <GameShell title="A to Z Fun Facts" subtitle="Tap a card to flip it and discover something amazing.">
      <LearnCards />
    </GameShell>
  )
}
