import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import AppQueryClientProvider from '@/components/providers/query-client'
import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'
import { querySEO } from '@/requests/query-seo'
import Script from 'next/script'

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

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const siteSettings = await querySEO()
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings?.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${siteSettings?.googleAnalyticsId}');
            `}
          </Script>
        </head>
        <body className={`${inter.className} min-h-screen`}>
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
