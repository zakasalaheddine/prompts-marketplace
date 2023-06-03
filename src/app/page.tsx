import { Button } from '../components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { featuredPrompts } from '../components/fake/data'
import PromptArtwork from '../components/prompt-artwork'
import SearchCommand from '../components/search-command'
import MainLayout from '@/components/layouts/main'

export default function Home() {
  return (
    <MainLayout
      title="Browse Our Diverse AI Prompt Marketplace"
      description="Discover a wide range of AI prompts. From GPT to DALL-E, from
    Midjourney to Stable Diffusion, find the prompt that suits
    your needs."
    >
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 space-x-4 pb-4 items-center gap-4">
          {featuredPrompts.map((prompt) => (
            <PromptArtwork
              key={prompt.title}
              prompt={prompt}
              href={`/prompt/${prompt.slug}`}
              className="w-[250px]"
              aspectRatio="square"
              width={250}
              height={330}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
