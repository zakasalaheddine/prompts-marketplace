import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  await prisma.platform.createMany({
    data: [
      { name: 'Chat GPT', slug: 'chat-gpt', withUpload: false },
      { name: 'BARD', slug: 'bard', withUpload: false },
      { name: 'MidJourney', slug: 'midjourney', withUpload: true },
      { name: 'DALLE 2', slug: 'dalle-2', withUpload: true },
      { name: 'STABLE DIFFUSION', slug: 'stable-diffusion', withUpload: true }
    ]
  })

  await prisma.category.createMany({
    data: [
      { name: 'POD', slug: 'pod' },
      { name: 'ArtWork', slug: 'artwork' },
      { name: 'Social Media', slug: 'social-media' },
      { name: 'Photography', slug: 'photography' },
      { name: 'Logo', slug: 'logo' },
      { name: 'Background', slug: 'background' },
      { name: '3D', slug: '3d' },
      { name: 'Content', slug: 'content' },
      { name: 'Cartoon', slug: 'cartoon' },
      { name: 'Animal', slug: 'animal' },
      { name: 'SEO', slug: 'seo' },
      { name: 'WebDesign', slug: 'webdesign' },
      { name: 'Book Publishing', slug: 'book-publishing' },
      { name: 'Other', slug: 'other' },
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })