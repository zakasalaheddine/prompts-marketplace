import { siteSettingFormSchema } from "@/types/site-settings-schema";
import { prisma } from "@/db"
import { isCurrentUserAdmin } from "@/lib/isAdmin";
import { auth } from "@clerk/nextjs";
import { z } from 'zod'

type SiteSettingsResult = z.infer<typeof siteSettingFormSchema>;

type ErrorResult = {
  error: string;
};


export async function querySiteSettings(): Promise<SiteSettingsResult | ErrorResult> {
  const { userId } = auth();
  if (!userId) return { error: 'Unauthorized' }
  const isAdmin = await isCurrentUserAdmin()
  if (!isAdmin) return { error: 'Unauthorized' }
  try {
    const siteSetting = await prisma.siteSetting.findFirst({ where: { id: 1 } })
    const parsed = siteSettingFormSchema.safeParse({
      ...siteSetting,
      commissionRate: Number(siteSetting?.commissionRate) || 0,
      minPrice: Number(siteSetting?.minPrice) || 0,
      maxPrice: Number(siteSetting?.maxPrice) || 0
    })
    if (parsed.success) {
      return parsed.data
    } else {
      return { error: "Invalid Data" }
    }
  } catch (error) {
    return { error: 'Invalid Data' }
  }
}