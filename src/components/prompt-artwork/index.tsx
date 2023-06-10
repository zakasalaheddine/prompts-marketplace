import { cn } from '@/lib/utils'
import { Prompt, Category, Platform } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface PromptArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  prompt: Prompt & {
    category: Category
    platform: Platform
  }
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
  href: string
}

export default function PromptArtwork({
  className,
  prompt,
  width,
  height,
  aspectRatio,
  href,
  ...props
}: PromptArtworkProps) {
  return (
    <div className={cn('space-y-3 relative', className)} {...props}>
      <Link href={href}>
        <div
          className="overflow-hidden rounded-md"
          style={{
            backgroundColor: prompt?.category?.bgColor && prompt.cover.trim() === ''
              ? prompt?.category?.bgColor
              : 'transparent',
            height:
              prompt?.category?.bgColor && prompt.cover.trim() === ''
                ? height
                : 'auto'
          }}
        >
          {prompt.cover.trim() && (
            <Image
              src={prompt.cover}
              alt={prompt.title}
              width={width}
              height={height}
              className={cn(
                'h-auto w-auto object-contain transition-all hover:scale-105',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
              )}
            />
          )}
        </div>
      </Link>
      <div className="space-y-1 text-sm">
        <Link href={href}>
          <h3 className="font-medium leading-none">{prompt.title}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{`$${prompt.price.toFixed(
          2
        )}`}</p>
      </div>
      <p className="absolute top-1 left-1 bg-secondary text-white px-2 rounded-sm shadow-sm ">
        {prompt.platform.name}
      </p>
    </div>
  )
}
