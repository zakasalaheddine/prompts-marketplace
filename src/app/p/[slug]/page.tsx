import MainLayout from '@/components/layouts/main'
import { prisma } from '@/db'
import { ALLOWED__PAGES } from '@/lib/allowed-pages'
import { isCurrentUserAdmin } from '@/lib/isAdmin'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const findPageContent = async () => {
  return await prisma.siteSetting.findFirst({
    where: { id: 1 }
  })
}
const pageTitle = (
  slug: 'about-us' | 'privacy-policy' | 'terms-and-conditions'
) => {
  const PAGES__TITLES = {
    'about-us': 'About US',
    'privacy-policy': 'Privacy Policy',
    'terms-and-conditions': 'Terms & Conditions'
  }
  return PAGES__TITLES[slug]
}

export async function generateMetadata({
  params
}: {
  params: { slug: 'about-us' | 'privacy-policy' | 'terms-and-conditions' }
}): Promise<Metadata> {
  return {
    title: pageTitle(params.slug)
  }
}

export default async function SitePage({
  params
}: {
  params: { slug: 'about-us' | 'privacy-policy' | 'terms-and-conditions' }
}) {
  const pageSetting = await findPageContent()
  if (!pageSetting || !(params.slug in ALLOWED__PAGES)) return notFound()

  const isAdmin = await isCurrentUserAdmin()

  return (
    <MainLayout
      title={pageTitle(params.slug)}
      logoText={pageSetting.name}
      isAdmin={isAdmin}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: (pageSetting as any)[ALLOWED__PAGES[params.slug]]
        }}
      />
    </MainLayout>
  )
}
