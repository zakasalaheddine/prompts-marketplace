import { siteSettingFormSchema } from "@/types/site-settings-schema";
import { prisma } from '@/db';
import { isCurrentUserAdmin } from "@/lib/isAdmin"
import { querySiteSettings } from "@/queries/site-settings"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const data = await querySiteSettings()
  console.log(data)
  if ('error' in data && data.error === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!('error' in data)) {
    return NextResponse.json(data)
  }
  return NextResponse.json({})
}

export async function PUT(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const isAdmin = await isCurrentUserAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const updatedSiteSetting = siteSettingFormSchema.parse(await req.json());

  return await prisma.siteSetting.upsert({
    where: { id: 1 },
    create: { ...updatedSiteSetting, googleAnalyticsId: updatedSiteSetting.googleAnalyticsId || '' },
    update: { ...updatedSiteSetting, googleAnalyticsId: updatedSiteSetting.googleAnalyticsId || '' }
  })
}