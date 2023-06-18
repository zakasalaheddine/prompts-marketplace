import { singlePrompt } from '@/components/fake/data'
import MainLayout from '@/components/layouts/main'
import PromptImagesSlider from '@/components/prompt-images-slider'
import { prisma } from '@/db'
import { isCurrentUserAdmin } from '@/lib/isAdmin'
import { querySEO } from '@/requests/query-seo'
import { auth, clerkClient } from '@clerk/nextjs'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PaymentSection from './payment-section'
import { exclude } from '@/lib/prisma/exclude'
import PromptText from './prompt'

const getPrompt = async (slug: string) => {
  const selectedPrompt = await prisma.prompt.findUnique({
    where: { slug },
    include: {
      category: true,
      platform: true,
      TagsOnPrompts: { include: { tag: true } }
    }
  })
  if (!selectedPrompt) return null
  try {
    const { userId } = auth()
    if (userId) {
      const purchaseCount = await prisma.purchases.count({
        where: { userId, promptId: selectedPrompt.id }
      })
      if (purchaseCount === 1 || userId === selectedPrompt.user_id)
        return { ...selectedPrompt, alreadyPurchased: true }
      else {
        const { prompt, ...restPrompt } = selectedPrompt
        return restPrompt
      }
    }
  } catch (error) {
    const { prompt, ...restPrompt } = selectedPrompt
    return restPrompt
  }
}

const getSeller = async (userId: string) => {
  try {
    const onBoardedUser = await prisma.paypalOnboardedUsers.findFirst({
      where: { userId }
    })
    const user = await clerkClient.users.getUser(userId)
    return {
      ...user,
      merchentId: onBoardedUser?.paypalMerchantId,
      sellerEmail: onBoardedUser?.paypalEmail
    }
  } catch (error) {
    return undefined
  }
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const siteSettings = await querySEO()
  const prompt = await getPrompt(params.slug)
  let promptImages = []
  if (prompt?.cover) promptImages.push(prompt?.cover)
  if (prompt?.images && Array.isArray(JSON.parse(prompt.images)))
    promptImages = [...promptImages, ...JSON.parse(prompt.images)]

  if (siteSettings && prompt) {
    return {
      title: `${prompt?.title} | ${siteSettings.name}`,
      description: prompt?.description,
      openGraph: {
        images: promptImages
      }
    }
  } else {
    return {}
  }
}

export default async function PromptPage({
  params
}: {
  params: { slug: string }
}) {
  const prompt = await getPrompt(params.slug)
  if (!prompt) return notFound()
  const seller = await getSeller(prompt.user_id)
  if (!seller) return notFound()
  const getImages = () => {
    let promptImages = []
    if (prompt?.cover) promptImages.push(prompt?.cover)
    if (prompt?.images && Array.isArray(JSON.parse(prompt.images)))
      promptImages = [...promptImages, ...JSON.parse(prompt.images)]
    return promptImages
  }
  const isAdmin = await isCurrentUserAdmin()
  const seo = await querySEO()

  return (
    <MainLayout title={prompt?.title} isAdmin={isAdmin} logoText={seo?.name}>
      <div className="grid grid-cols-12">
        <div className="col-span-6 w-full">
          <PromptImagesSlider images={getImages()} />
        </div>
        <div className="col-span-6 flex flex-col gap-5 h-full">
          <p className="text-sm text-muted-foreground">{prompt.description}</p>
          <Link href="/" className="font-semibold tracking-tight">
            {`@${seller.username}`}
            <span className="block font-light text-sm">Prompt Engineer</span>
          </Link>
          <div className="flex gap-4">
            <p className="block font-light text-sm">
              Prompt Type:{' '}
              <Link
                href={`/platform/${prompt.platform.slug}`}
                className="font-semibold tracking-tight text-base"
              >
                {prompt.platform.name}
              </Link>
            </p>
            <p className="block font-light text-sm">
              Prompt Category:{' '}
              <Link
                href={`/category/${prompt.category.slug}`}
                className="font-semibold tracking-tight text-base"
              >
                {prompt.category.name}
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-1 text-sm">
            <span className="font-light">Tags:</span>
            {prompt.TagsOnPrompts.map((tag) => (
              <Link
                key={tag.tagId}
                href={`/tag/${tag.tag.slug}`}
                className="font-semibold tracking-tight"
              >
                <span>#{tag.tag.name}</span>
              </Link>
            ))}
          </div>
          {'alreadyPurchased' in prompt ? (
            <PromptText promptText={prompt.prompt} />
          ) : (
            <PaymentSection
              price={`${singlePrompt.price}`}
              sellerEmail={seller.sellerEmail || ''}
              sellerMerchentId={seller.merchentId || ''}
              promptId={prompt.id}
            />
          )}
        </div>
      </div>
    </MainLayout>
  )
}
