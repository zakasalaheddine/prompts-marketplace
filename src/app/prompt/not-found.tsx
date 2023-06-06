import MainLayout from '@/components/layouts/main'
import Link from 'next/link'

export default function PromptNotFound() {
  return (
    <MainLayout title="Prompt Not Founded">
      <Link href="/">Go Home</Link>
    </MainLayout>
  )
}
