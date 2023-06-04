import MainLayout from '@/components/layouts/main'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getPlatformsCategories = async () => {
  const [platforms, categories, tags] = await Promise.all([
    prisma.platform.findMany(),
    prisma.category.findMany(),
    prisma.tag.findMany()
  ])
  return { platforms, categories, tags }
}

export default async function SellPage() {
  const { categories, platforms } = await getPlatformsCategories()
  return (
    <MainLayout
      title="Monetize Your AI Prompt Engineering Skills"
      description="Showcase Your Creativity and Craft on Our Marketplace"
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter a title for the prompt"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a description for the prompt"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="platform">Platform</Label>
            <Select>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select a Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {platforms.map((platform) => (
                    <SelectItem value={`${platform.id}`} key={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem value={`${category.id}`} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
