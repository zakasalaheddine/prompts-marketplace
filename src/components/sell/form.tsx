'use client'
import { Category, Platform, Prompt, Tag } from '@prisma/client'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { FormEvent, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { SellFormSchema } from '@/types/sell-form-schema'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

type SellFormProps = {
  categories: Category[]
  platforms: Platform[]
  tags: Tag[]
  canSell: boolean
  minPrice: number
  maxPrice: number
}

export default function SellForm({
  categories,
  platforms,
  canSell,
  minPrice,
  maxPrice
}: SellFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [platform, setPlatform] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [cover, setCover] = useState<File | null>(null)
  const [images, setImages] = useState<FileList | null>(null)
  const [prompt, setPrompt] = useState('')
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function addNewPrompt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const promptToSell = SellFormSchema.extend({
      price: z
        .number()
        .min(minPrice, { message: `Minimum Price is $${minPrice}` })
        .max(maxPrice, { message: `Maximum Price is $${maxPrice}` })
        .default(0)
    }).safeParse({
      title,
      description,
      tags,
      platform,
      category,
      price,
      prompt
    })
    if (!promptToSell.success) {
      setErrors(promptToSell.error.format())
      return
    }
    setErrors({})
    const formData = new FormData()
    if (cover) formData.append('cover', cover)
    if (images && images.length > 0) {
      Array.from(images).map((image) => formData.append('images', image))
    }
    formData.append('title', title)
    formData.append('description', description)
    formData.append('tags', tags)
    formData.append('platform', platform)
    formData.append('category', category)
    formData.append('price', price.toString())
    formData.append('prompt', prompt)
    try {
      setIsLoading(true)
      await axios.post<Prompt>('/api/sell', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setIsLoading(false)
      toast({ title: 'Prompt submitted for review' })
      router.push(`/`)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <form
      className="flex flex-col gap-4 md:grid md:grid-cols-2"
      onSubmit={addNewPrompt}
    >
      <div className="flex flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter a title for the prompt"
            className={cn(errors && errors['title'] ? 'border-red-500' : '')}
          />
          {errors && errors['title'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['title']['_errors'][0]}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter a description for the prompt"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            className={cn(
              errors && errors['description'] ? 'border-red-500' : ''
            )}
          />
          {errors && errors['description'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['description']['_errors'][0]}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="tags">Tags</Label>
          <Textarea
            id="tags"
            name="tags"
            placeholder="enter your tag list and separate them using ','"
            value={tags}
            onChange={({ target }) => setTags(target.value)}
            className={cn(errors && errors['tags'] ? 'border-red-500' : '')}
          />
          {errors && errors['tags'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['tags']['_errors'][0]}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:items-end">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="platform">Platform</Label>
          <Select
            name="platform"
            value={platform}
            onValueChange={(value) => setPlatform(value)}
          >
            <SelectTrigger
              id="platform"
              className={cn(
                errors && errors['platform'] ? 'border-red-500' : ''
              )}
            >
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
          {errors && errors['platform'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['platform']['_errors'][0]}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger
              id="category"
              className={cn(
                errors && errors['category'] ? 'border-red-500' : ''
              )}
            >
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
          {errors && errors['category'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['category']['_errors'][0]}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="cover">Cover</Label>
          <Input
            name="cover"
            id="cover"
            type="file"
            accept="image/*"
            onChange={({ target }) => {
              target.files && target.files[0] && setCover(target.files[0])
            }}
            className={cn(errors && errors['cover'] ? 'border-red-500' : '')}
          />
          {errors && errors['cover'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['cover']['_errors'][0]}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="images">Other images</Label>
          <Input
            name="images"
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={({ target }) => {
              target.files && target.files.length > 0 && setImages(target.files)
            }}
            className={cn(errors && errors['images'] ? 'border-red-500' : '')}
          />
          {errors && errors['images'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['images']['_errors'][0]}
            </p>
          )}
        </div>
      </div>
      <div className="col-span-2 my-4 flex flex-col gap-4 w-full">
        <Separator />
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            placeholder="$0.00"
            value={price}
            onChange={({ target }) => setPrice(Number(target.value))}
            className={cn(errors && errors['price'] ? 'border-red-500' : '')}
          />
          {errors && errors['price'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['price']['_errors'][0]}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            name="prompt"
            placeholder="Enter the prompt"
            rows={10}
            value={prompt}
            onChange={({ target }) => setPrompt(target.value)}
            className={cn(errors && errors['prompt'] ? 'border-red-500' : '')}
          />
          {errors && errors['prompt'] && (
            <p className="text-sm text-muted-foreground text-red-500">
              {errors['prompt']['_errors'][0]}
            </p>
          )}
        </div>
        <Button
          variant="secondary"
          className="max-w-sm"
          type="submit"
          disabled={!canSell || isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            'Submit for review'
          )}
        </Button>
      </div>
    </form>
  )
}
