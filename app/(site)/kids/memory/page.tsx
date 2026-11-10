import { GameShell } from '@/components/kids/game-shell'
import { MemoryGame } from '@/components/kids/memory-game'

export const metadata = { title: 'Memory Match' }

export default function MemoryPage() {
  return (
    <GameShell title="Memory Match" subtitle="Flip two cards at a time. Can you find every pair in 8 moves?">
      <MemoryGame />
    </GameShell>
  )
}
