import { prisma } from "@/db";

export async function querySEO() {
  return await prisma.siteSetting.findFirst({
    where: { id: 1 },
    select: { name: true, description: true, googleAnalyticsId: true, homePageDescrition: true, homePageHeadline: true }
  })
}