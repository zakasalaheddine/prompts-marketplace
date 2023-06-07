import { cn } from '@/lib/utils'
import { ReactNode, useCallback } from 'react'
import { PackagePlus, Tag, TrendingUp } from 'lucide-react'
import SidebarButton from './sidebar-button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  logo: ReactNode
}

export default function Sidebar({ className, logo }: SidebarProps) {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return `/?${params.toString()}`
    },
    [searchParams]
  )

  const isPlatformSelected = useCallback(
    (key: string, slug: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.get(key) === slug
    },
    [searchParams]
  )

  return (
    <div className={cn('pb-8', className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">{logo}</div>
        <div className="space-y-1">
          <Link href={createQueryString('order', 'trending')}>
            <SidebarButton
              icon={<TrendingUp className="mr-2 h-4 w-4" />}
              label="Trending"
              isSelected={isPlatformSelected('order', 'trending')}
            />
          </Link>
          <Link href={createQueryString('order', 'new')}>
            <SidebarButton
              icon={<PackagePlus className="mr-2 h-4 w-4" />}
              label="New"
              isSelected={isPlatformSelected('order', 'new')}
            />
          </Link>
          <Link href={createQueryString('order', 'free')}>
            <SidebarButton
              icon={<Tag className="mr-2 h-4 w-4" />}
              label="Free"
              isSelected={isPlatformSelected('order', 'free')}
            />
          </Link>
        </div>
        <div className="space-y-1">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Platforms
          </h2>
          <Link href={createQueryString('platform', 'chat-gpt')}>
            <SidebarButton
              icon={<Tag className="mr-2 h-4 w-4" />}
              label="CHATGPT"
              isSelected={isPlatformSelected('platform', 'chat-gpt')}
            />
          </Link>

          <Link href={createQueryString('platform', 'bard')}>
            <SidebarButton
              icon={<Tag className="mr-2 h-4 w-4" />}
              label="BARD"
              isSelected={isPlatformSelected('platform', 'bard')}
            />
          </Link>
          <Link href={createQueryString('platform', 'midjourney')}>
            <SidebarButton
              icon={<Tag className="mr-2 h-4 w-4" />}
              label="MIDJOURNEY"
              isSelected={isPlatformSelected('platform', 'midjourney')}
            />
          </Link>
          <Link href={createQueryString('platform', 'dalle-2')}>
            <SidebarButton
              icon={<Tag className="mr-2 h-4 w-4" />}
              label="DALLE 2"
              isSelected={isPlatformSelected('platform', 'dalle-2')}
            />
          </Link>
          <Link href={createQueryString('platform', 'stable-diffusion')}>
            <SidebarButton
              icon={<Tag className="mr-2 h-4 w-4" />}
              label="STABLE DIFFUSION"
              isSelected={isPlatformSelected('platform', 'stable-diffusion')}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
