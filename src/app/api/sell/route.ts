import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import slugify from "slugify";
import { cloudinaryUploadFile } from "@/lib/cloudinary";
import { SellFormSchema } from "@/types/sell-form-schema";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.formData()
  const promptSell = SellFormSchema.safeParse({
    ...Object.fromEntries(data.entries()),
    price: Number(data.get('price')),
    images: data.getAll('images')
  })
  if (!promptSell.success) {
    return NextResponse.json({ ...promptSell.error.flatten() }, { status: 500 })
  }
  const { data: { title, description, price, category, platform, prompt, tags, cover, images } } = promptSell
  const TagsData = tags.split(',').map(tag => ({ name: tag.toLowerCase(), slug: slugify(tag) }))

  await prisma.tag.createMany({ data: TagsData, skipDuplicates: true })
  const coverUrl = await cloudinaryUploadFile(cover)
  const imagesUrls: string[] = []
  if (images) {
    for (const image of images) {
      const result = await cloudinaryUploadFile(image)
      imagesUrls.push(result.url)
    }
  }
  const createdPrompt = await prisma.prompt.create({
    data: {
      title,
      description,
      price,
      prompt,
      categoryId: Number(category),
      platformId: Number(platform),
      slug: slugify(promptSell.data.title),
      cover: coverUrl.url,
      images: JSON.stringify(imagesUrls),
      user_id: userId
    }
  })
  const tagsResult = await prisma.tag.findMany({ where: { slug: { in: TagsData.map(tag => tag.slug) } } })
  await prisma.tagsOnPrompts.createMany({ data: tagsResult.map(tag => ({ tagId: tag.id, promptId: createdPrompt.id })) })
  return NextResponse.json(createdPrompt)
}