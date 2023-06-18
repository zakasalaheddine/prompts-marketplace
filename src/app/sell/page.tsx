import MainLayout from '@/components/layouts/main'
import SellForm from '@/components/sell/form'
import { prisma } from '@/db'
import { isCurrentUserAdmin } from '@/lib/isAdmin'
import PaypalConnectionButton from './paypal-button'
import { isUserOnboarded } from '@/lib/paypal/is-user-onboarded'

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
  const userHasOnboarded = await isUserOnboarded()
  return (
    <MainLayout
      title="Monetize Your AI Prompt Engineering Skills"
      description="Showcase Your Creativity and Craft on Our Marketplace"
      sellerPage
      isAdmin={isAdmin}
    >
      <div className="flex flex-col justify-center gap-4 w-full">
        {!userHasOnboarded && <PaypalConnectionButton />}
        <SellForm categories={categories} platforms={platforms} tags={tags} />
      </div>
    </MainLayout>
  )
}
