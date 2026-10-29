import { notFound } from 'next/navigation'
import { GameShell } from '@/components/kids/game-shell'
import { QuizGame } from '@/components/kids/quiz-game'
import { quizTopics } from '@/lib/kids-data'

export function generateStaticParams() {
  return quizTopics.map((t) => ({ topic: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const t = quizTopics.find((q) => q.id === topic)
  return { title: t ? `${t.title} Quiz` : 'Quiz' }
}

export default async function QuizPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const t = quizTopics.find((q) => q.id === topic)
  if (!t) notFound()
  return (
    <GameShell title={t.title} subtitle={t.blurb}>
      <QuizGame topic={t} />
    </GameShell>
  )
}
