'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function PaypalConnectionButton() {
  const [actionURL, setActionURL] = useState('')
  const [sellerPaypalEmail, setSellerPaypalEmail] = useState('')
  const { toast } = useToast()
  const { mutateAsync } = useMutation(['on-boarding-links'], () =>
    axios.get('/api/payments')
  )
  const { mutateAsync: saveSellerInfoMutation } = useMutation(
    ['save-seller'],
    ({
      merchantId,
      paypalEmail
    }: {
      merchantId: string
      paypalEmail: string
    }) => axios.post('/api/payments', { merchantId, paypalEmail })
  )
  const searchParams = useSearchParams()
  const merchantIdInPayPal = searchParams.get('merchantIdInPayPal')

  const handleOnBoarding = async () => {
    if (merchantIdInPayPal) {
      try {
        await saveSellerInfoMutation({
          merchantId: merchantIdInPayPal,
          paypalEmail: sellerPaypalEmail
        })
        return
      } catch (error) {
        console.error(error)
      }
    }
    try {
      const {
        data: { links }
      } = await mutateAsync()
      setActionURL(links[1].href)
    } catch (error) {
      console.error(error)
      toast({
        description:
          "Couldn't get the onBoarding Links, please reload the page",
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    handleOnBoarding()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantIdInPayPal])
  return (
    <>
      <Script
        id="paypal-script-loader"
        onLoad={() => console.log('script loaded')}
        dangerouslySetInnerHTML={{
          __html: `(function(d, s, id) {
      var js, ref = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.async = true;
        js.src = "https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js";
        ref.parentNode.insertBefore(js, ref);
      }
    }(document, "script", "paypal-js"));`
        }}
      ></Script>
      {actionURL && (
        <>
          <Input
            placeholder="Paypal Email"
            value={sellerPaypalEmail}
            onChange={({ target }) => setSellerPaypalEmail(target.value)}
            className="mb-4"
          />
          <Button
            variant="secondary"
            className="mx-auto"
            asChild
            disabled={!sellerPaypalEmail}
          >
            <Link href={actionURL} data-paypal-button="true" target="PPFrame">
              Connect Your Paypal Account to accept Payments
            </Link>
          </Button>
        </>
      )}
    </>
  )
}
