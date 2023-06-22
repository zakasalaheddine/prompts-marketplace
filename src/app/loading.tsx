import MainLayout from '@/components/layouts/main'
import { querySEO } from '@/requests/query-seo'
import { Loader2 } from 'lucide-react'

export default async function LoadingPage() {
  const seo = await querySEO()
  return (
    <MainLayout
      title={seo?.homePageHeadline || ''}
      description={seo?.homePageDescrition || ''}
      isAdmin={false}
      logoText={seo?.name}
    >
      <Loader2 className="animate-spin mx-auto" />
    </MainLayout>
  )
}
