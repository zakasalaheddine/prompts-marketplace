import PromptArtwork from '../components/prompt-artwork'
import MainLayout from '@/components/layouts/main'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getPrompts({
  category,
  platform,
  order
}: {
  category?: string
  platform?: string
  order?: string
}) {
  let orderBy:
    | Prisma.Enumerable<Prisma.PromptOrderByWithRelationInput>
    | undefined = undefined
  if (order === 'trending' || order === undefined)
    orderBy = { sales: { _count: 'desc' } }
  if (order === 'new') orderBy = { id: 'desc' }
  const promptsList = await prisma.prompt.findMany({
    include: { category: true, platform: true },
    where: {
      category: { slug: category },
      AND: {
        platform: { slug: platform },
        AND: { price: order === 'free' ? 0 : undefined }
      }
    },
    orderBy: orderBy ? { ...orderBy } : undefined
  })
  prisma.$disconnect()
  return promptsList
}

export default async function Home({
  searchParams: { category, platform, order }
}: {
  searchParams: { category?: string; platform?: string; order?: string }
}) {
  const prompts = await getPrompts({ category, platform, order })
  return (
    <MainLayout
      title="Browse Our Diverse AI Prompt Marketplace"
      description="Discover a wide range of AI prompts. From GPT to DALL-E, from
    Midjourney to Stable Diffusion, find the prompt that suits
    your needs."
    >
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 space-x-4 pb-4 items-center gap-4">
          {prompts.map((prompt) => (
            <PromptArtwork
              key={prompt.title}
              prompt={prompt}
              href={`/prompt/${prompt.slug}`}
              className="w-[250px]"
              aspectRatio="square"
              width={250}
              height={330}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
