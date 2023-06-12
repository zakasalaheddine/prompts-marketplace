import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import AppQueryClientProvider from '@/components/providers/query-client'
import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'
import { querySEO } from '@/requests/query-seo'

const inter = Inter({ subsets: ['latin'] })

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

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
