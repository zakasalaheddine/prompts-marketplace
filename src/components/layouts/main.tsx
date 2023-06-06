'use client'
import { ReactNode } from 'react'
import Sidebar from '../sidebar'
import SearchCommand from '../search-command'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

interface MainLayoutProps {
  children: ReactNode
  title: string
  description?: string | ``
  sellerPage?: boolean
}

export default function MainLayout({
  children,
  title,
  description,
  sellerPage = false
}: MainLayoutProps) {
  return (
    <main className="bg-background h-full flex flex-col justify-between min-h-screen">
      <div className="grid lg:grid-cols-12 relative h-full flex-1">
        <Sidebar
          logo={
            <Link href="/">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                Ai Buddy
              </h2>
            </Link>
          }
          selected="trending"
          className="hidden lg:block lg:fixed w-60 z-10"
        />
        <div className="lg:ml-60 lg:col-span-12 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
            <div className="flex items-center flex-col justify-center md:justify-between md:flex-row">
              <div className="space-y-1 md:max-w-lg">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {title}
                </h2>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
              {sellerPage ? null : (
                <div className="mt-2 md:mt-0 flex gap-3">
                  <SearchCommand />
                  <Link href="/sell">
                    <Button variant="secondary">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span className="whitespace-nowrap">Start Selling</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <Separator className="my-4" />
            {children}
          </div>
        </div>
      </div>
      <footer className="w-full bg-secondary z-40 h-20 flex px-20 items-center justify-between">
        <h2 className="mb-2 px-2 text-2xl font-semibold tracking-tight text-white">
          Ai Buddy
        </h2>
        <div className="flex text-white gap-2 font-light tracking-tight">
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Privacy</Link>
          <Link href="/">Terms of conditions</Link>
        </div>
      </footer>
    </main>
  )
}
