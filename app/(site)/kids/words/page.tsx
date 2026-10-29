import { GameShell } from '@/components/kids/game-shell'
import { WordGame } from '@/components/kids/word-game'

export const metadata = { title: 'Word Scramble' }

export default function WordsPage() {
  return (
    <GameShell title="Word Scramble" subtitle="Tap the letters in the right order to spell the word.">
      <WordGame />
    </GameShell>
  )
}
