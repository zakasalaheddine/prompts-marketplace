import { Prompt } from '@/components/fake/data'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Url } from 'url'

interface PromptArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  prompt: Prompt
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
    <div className={cn('space-y-3', className)} {...props}>
      <Link href={href}>
        <div
          className="overflow-hidden rounded-md"
          style={{
            backgroundColor: prompt.bgColor ? prompt.bgColor : 'transparent'
          }}
        >
          <Image
            src={prompt.cover}
            alt={prompt.title}
            width={width}
            height={height}
            className={cn(
              'h-auto w-auto object-cover transition-all hover:scale-105',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
            )}
          />
        </div>
      </Link>
      <div className="space-y-1 text-sm">
        <Link href={href}>
          <h3 className="font-medium leading-none">{prompt.title}</h3>
        </Link>

        <Link href={`/seller/${prompt.seller}`}>
          <p className="text-xs text-muted-foreground">{prompt.seller}</p>
        </Link>
      </div>
    </div>
  )
}
