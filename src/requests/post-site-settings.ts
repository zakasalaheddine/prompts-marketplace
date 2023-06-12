import { siteSettingFormSchema } from "@/types/site-settings-schema";
import axios from "axios";
import { z } from "zod";

export async function saveSiteSettings(values: z.infer<typeof siteSettingFormSchema>) {
  const { data } = await axios.put('/api/site', values)
  return data
}