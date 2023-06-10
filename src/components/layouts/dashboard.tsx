import { ReactNode } from 'react'
import { SidebarNav } from '../sidebar-nav'
import { Separator } from '../ui/separator'
import MainLayout from './main'
import { DashboardContextProvider } from '@/contexts/dashboard-context'

const sidebarNavItems = [
  {
    title: 'Prompt Publishing',
    href: '/dashboard'
  },
  {
    title: 'Pages',
    href: '/'
  },
  {
    title: 'Site Setting',
    href: '/dashboard/site'
  }
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout title="Dashboard" description="">
      <div>
        <p className="text-muted-foreground text-sm">
          Manage your site settings
        </p>
        <Separator className="my-4" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </MainLayout>
  )
}
