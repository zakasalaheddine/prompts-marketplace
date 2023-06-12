import { z } from "zod";

export const siteSettingFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  contactEmail: z.string().email(),
  googleAnalyticsId: z.string().optional(),
  commissionRate: z.number().min(0).max(100),
  minPrice: z.number().min(0).default(0),
  maxPrice: z.number().min(0),
  homePageHeadline: z.string(),
  homePageDescrition: z.string(),
  aboutUsContent: z.string(),
  privacyContent: z.string(),
  termsContent: z.string()
})