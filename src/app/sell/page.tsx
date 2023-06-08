import MainLayout from '@/components/layouts/main'
import SellForm from '@/components/sell/form'
import { isCurrentUserAdmin } from '@/lib/isAdmin'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getPlatformsCategories = async () => {
  const [platforms, categories, tags] = await Promise.all([
    prisma.platform.findMany(),
    prisma.category.findMany(),
    prisma.tag.findMany()
  ])
  return { platforms, categories, tags }
}

export default async function SellPage() {
  const { categories, platforms, tags } = await getPlatformsCategories()
  const isAdmin = await isCurrentUserAdmin()
  return (
    <MainLayout
      title="Monetize Your AI Prompt Engineering Skills"
      description="Showcase Your Creativity and Craft on Our Marketplace"
      sellerPage
      isAdmin={isAdmin}
    >
      <SellForm categories={categories} platforms={platforms} tags={tags} />
    </MainLayout>
  )
}
