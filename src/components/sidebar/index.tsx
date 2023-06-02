import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Button } from '../ui/button'
import { PackagePlus, Tag, TrendingUp } from 'lucide-react'
import SidebarButton from './sidebar-button'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  logo: ReactNode
  selected: 'trending' | 'new' | 'free'
}

export default function Sidebar({ className, logo, selected }: SidebarProps) {
  return (
    <div className={cn('pb-8', className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">{logo}</div>
        <div className="space-y-1">
          <SidebarButton
            icon={<TrendingUp className="mr-2 h-4 w-4" />}
            label="Trending"
            isSelected={selected === 'trending'}
          />
          <SidebarButton
            icon={<PackagePlus className="mr-2 h-4 w-4" />}
            label="New"
            isSelected={selected === 'new'}
          />
          <SidebarButton
            icon={<Tag className="mr-2 h-4 w-4" />}
            label="Free"
            isSelected={selected === 'free'}
          />
        </div>
        <div className="space-y-1">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Platforms
          </h2>
          <SidebarButton
            icon={<Tag className="mr-2 h-4 w-4" />}
            label="CHATGPT"
          />
          <SidebarButton icon={<Tag className="mr-2 h-4 w-4" />} label="BARD" />
          <SidebarButton
            icon={<Tag className="mr-2 h-4 w-4" />}
            label="MIDJOURNEY"
          />
          <SidebarButton
            icon={<Tag className="mr-2 h-4 w-4" />}
            label="DALLE 2"
          />
          <SidebarButton
            icon={<Tag className="mr-2 h-4 w-4" />}
            label="STABLE DIFFUSION"
          />
        </div>
      </div>
    </div>
  )
}
