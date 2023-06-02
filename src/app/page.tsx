import Sidebar from '../components/sidebar'
import { Button } from '../components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { featuredPrompts } from '../components/fake/data'
import PromptArtwork from '../components/prompt-artwork'
import SearchCommand from '../components/search-command'

export default function Home() {
  return (
    <main className="bg-background">
      <div className="grid lg:grid-cols-12 relative">
        <Sidebar
          logo={
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Ai Buddy
            </h2>
          }
          selected="trending"
          className="hidden lg:block lg:fixed w-60"
        />
        <div className="ml-60 lg:col-span-12 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
            <div className="flex items-center flex-col justify-center md:justify-between md:flex-row">
              <div className="space-y-1 md:max-w-lg">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Browse Our Diverse AI Prompt Marketplace
                </h2>
                <p className="text-sm text-muted-foreground">
                  Discover a wide range of AI prompts. From GPT to DALL-E, from
                  Midjourney to Stable Diffusion, find the prompt that suits
                  your needs.
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex gap-3">
                <SearchCommand />
                <Button variant="secondary">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span className='whitespace-nowrap'>Start Selling</span>
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 space-x-4 pb-4 items-center gap-4">
                {featuredPrompts.map((prompt) => (
                  <PromptArtwork
                    key={prompt.title}
                    prompt={prompt}
                    href='/single'
                    className="w-[250px]"
                    aspectRatio="square"
                    width={250}
                    height={330}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
