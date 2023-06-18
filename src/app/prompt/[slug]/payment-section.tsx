'use client'

import { Button } from '@/components/ui/button'
import PaypalPayment from './paypal-payment'
import { SignInButton, useAuth } from '@clerk/nextjs'

interface PaymentSectionProps {
  price: string
  sellerEmail: string
  promptId: number
  sellerMerchentId: string
}

export default function PaymentSection({
  price,
  sellerEmail,
  promptId,
  sellerMerchentId
}: PaymentSectionProps) {
  const { isSignedIn } = useAuth()
  return isSignedIn ? (
    <PaypalPayment
      sellerEmailAddress={sellerEmail}
      promptId={promptId}
      merchantId={sellerMerchentId}
    />
  ) : (
    <SignInButton mode="modal">
      <Button variant="secondary">Get Prompt (${price})</Button>
    </SignInButton>
  )
}
