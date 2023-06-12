import { siteSettingFormSchema } from "@/types/site-settings-schema";
import axios from "axios";

export async function getSiteSettings() {
  const { data } = await axios.get('/api/site')
  return siteSettingFormSchema.parse(data)
}