import DashboardLayout from '@/components/layouts/dashboard'
import SiteSettingsForm from '@/components/settings/site-form'
import { Separator } from '@/components/ui/separator'
import { querySiteSettings } from '@/queries/site-settings'
import { redirect } from 'next/navigation'

export default async function SiteSetting() {
  let siteSettings = undefined
  const data = await querySiteSettings()
  if ('error' in data && data.error === 'Unauthorized') {
    return redirect('/')
  } else if (!('error' in data)) {
    siteSettings = data
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Site Settings</h3>
          <p className="text-sm text-muted-foreground">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            This is where you can change you're site paramters
          </p>
        </div>
        <Separator />
        <SiteSettingsForm defaultValues={siteSettings} />
      </div>
    </DashboardLayout>
  )
}
