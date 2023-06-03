'use client'
import { ReactNode } from 'react'
import Sidebar from '../sidebar'
import SearchCommand from '../search-command'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'

interface MainLayoutProps {
  children: ReactNode
  title: string
  description?:
    | string
    | ``
}

export default function MainLayout({
  children,
  title,
  description
}: MainLayoutProps) {
  return (
    <main className="bg-background h-full">
      <div className="grid lg:grid-cols-12 relative">
        <Sidebar
          logo={
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Ai Buddy
            </h2>
          }
          selected="trending"
          className="hidden lg:block lg:fixed w-60 lg:border-r h-full"
        />
        <div className="ml-60 lg:col-span-12">
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
              <div className="mt-2 md:mt-0 flex gap-3">
                <SearchCommand />
                <Button variant="secondary">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span className="whitespace-nowrap">Start Selling</span>
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
