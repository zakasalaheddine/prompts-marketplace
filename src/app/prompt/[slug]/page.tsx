import { singlePrompt } from '@/components/fake/data'
import MainLayout from '@/components/layouts/main'
import PromptImagesSlider from '@/components/prompt-images-slider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PromptPage({ params }: { params: { slug: string } }) {
  return (
    <MainLayout title={singlePrompt.title(10)}>
      <div className="grid grid-cols-12">
        <div className="col-span-6 w-full">
          <PromptImagesSlider images={singlePrompt.images} />
        </div>
        <div className="col-span-6 flex flex-col gap-5 h-full">
          <p className="text-sm text-muted-foreground">
            {singlePrompt.description(20)}
          </p>
          <Link href="/" className="font-semibold tracking-tight">
            {`@${singlePrompt.seller()}`}
            <span className="block font-light text-sm">Prompt Engineer</span>
          </Link>
          <div className="flex gap-4">
            <p className="block font-light text-sm">
              Prompt Type:{' '}
              <Link href="/" className="font-semibold tracking-tight text-base">
                {singlePrompt.platform}
              </Link>
            </p>
            <p className="block font-light text-sm">
              Prompt Category:{' '}
              <Link href="/" className="font-semibold tracking-tight text-base">
                {singlePrompt.category}
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-1 text-sm">
            <span className="font-light">Tags:</span>
            {singlePrompt.tags.map((tag) => (
              <Link
                key={tag}
                href="/"
                className="font-semibold tracking-tight "
              >
                <span>#{tag}</span>
              </Link>
            ))}
          </div>
          <Button variant="secondary">Get Prompt (${singlePrompt.price})</Button>
        </div>
      </div>
    </MainLayout>
  )
}
