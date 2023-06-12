'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Separator } from '../ui/separator'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Button } from '../ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getSiteSettings } from '@/requests/get-site-settings'
import { saveSiteSettings } from '@/requests/post-site-settings'
import { Loader2 } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { siteSettingFormSchema } from '@/types/site-settings-schema'
import { useEffect } from 'react'

export default function SiteSettingsForm({
  defaultValues
}: {
  defaultValues?: z.infer<typeof siteSettingFormSchema>
}) {
  const { data } = useQuery(['site-settings'], getSiteSettings, {
    initialData: defaultValues
  })
  const { mutateAsync, isLoading } = useMutation(
    ['site-settings-update'],
    saveSiteSettings
  )
  const form = useForm<z.infer<typeof siteSettingFormSchema>>({
    resolver: zodResolver(siteSettingFormSchema),
    mode: 'onChange',
    defaultValues: data
  })
  const { toast } = useToast()
  const onSubmit = async (
    submitInfo: z.infer<typeof siteSettingFormSchema>
  ) => {
    try {
      await mutateAsync(submitInfo)
      toast({ title: 'Site Settings Saved Successufully' })
    } catch (error) {
      console.log({ error })
      toast({ title: 'Something went wrong!!', variant: 'destructive' })
    }
  }

  useEffect(() => {
    console.log({ data })
  }, [data])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full gap-4">
          <div className="flex-1 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ai Buddy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your marketplace description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleAnalyticsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Analytics ID</FormLabel>
                  <FormControl>
                    <Input placeholder="GA-XXXX-XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 space-y-4">
            <FormField
              control={form.control}
              name="homePageHeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Page Headline</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ai Buddy" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="homePageDescrition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Page Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ai Buddy" rows={9} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <FormField
          control={form.control}
          name="commissionRate"
          rules={{
            onChange: ({ target }) =>
              form.setValue('commissionRate', Number(target.value))
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marketplace Commission Rate</FormLabel>
              <FormControl>
                <Input
                  placeholder="10%"
                  type="number"
                  min={0}
                  max={100}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minPrice"
          rules={{
            onChange: ({ target }) =>
              form.setValue('minPrice', Number(target.value))
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Price For Prompt</FormLabel>
              <FormControl>
                <Input placeholder="0" type="number" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxPrice"
          rules={{
            onChange: ({ target }) =>
              form.setValue('maxPrice', Number(target.value))
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Price For Prompt</FormLabel>
              <FormControl>
                <Input placeholder="100" type="number" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="aboutUsContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About us</FormLabel>
              <FormControl>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(value) => field.onChange({ target: { value } })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacyContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Privacy Policy</FormLabel>
              <FormControl>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(value) => field.onChange({ target: { value } })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="termsContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms & Conditions</FormLabel>
              <FormControl>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(value) => field.onChange({ target: { value } })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="float-right"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
        </Button>
      </form>
    </Form>
  )
}
