import PromptArtwork from '../components/prompt-artwork'
import MainLayout from '@/components/layouts/main'
import { prisma } from '@/db'
import { isCurrentUserAdmin } from '@/lib/isAdmin'
import { querySEO } from '@/requests/query-seo'
import { Prisma } from '@prisma/client'
import { Metadata } from 'next'

async function getPrompts({
  category,
  platform,
  order,
  search
}: {
  category?: string
  platform?: string
  order?: string
  search?: string
}) {
  if (search) {
    return await prisma.prompt.findMany({
      include: { category: true, platform: true },
      where: {
        title: { contains: search },
        status: 'PUBLISHED'
      }
    })
  }
  let orderBy:
    | Prisma.Enumerable<Prisma.PromptOrderByWithRelationInput>
    | undefined = undefined
  if (order === 'trending' || order === undefined)
    orderBy = { sales: { _count: 'desc' } }
  if (order === 'new') orderBy = { id: 'desc' }
  return await prisma.prompt.findMany({
    include: { category: true, platform: true },
    where: {
      status: 'PUBLISHED',
      category: { slug: category },
      AND: {
        platform: { slug: platform },
        AND: { price: order === 'free' ? 0 : undefined }
      }
    },
    orderBy: orderBy ? { ...orderBy } : undefined
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await querySEO()
  if (siteSettings) {
    return {
      title: siteSettings.name,
      description: siteSettings.description
    }
  } else {
    return {}
  }
}

export default async function Home({
  searchParams: { category, platform, order, search }
}: {
  searchParams: {
    category?: string
    platform?: string
    order?: string
    search?: string
  }
}) {
  const isAdmin = await isCurrentUserAdmin()

  const prompts = await getPrompts({ category, platform, order, search })
  const seo = await querySEO()
  return (
    <MainLayout
      title={seo?.homePageHeadline || ''}
      description={seo?.homePageDescrition || ''}
      isAdmin={isAdmin}
      logoText={seo?.name}
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
              height={250}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
