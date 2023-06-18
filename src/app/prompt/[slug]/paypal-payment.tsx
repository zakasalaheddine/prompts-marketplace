'use client'
import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider
} from '@paypal/react-paypal-js'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function PaypalPayment({
  promptId,
  merchantId,
  sellerEmailAddress
}: {
  promptId: number
  merchantId: string
  sellerEmailAddress: string
}) {
  const router = useRouter()
  const createOrderMutation = useMutation(['create-order'], () =>
    axios.post('/api/paypal/create-order', {
      promptId,
      emailAddress: sellerEmailAddress
    })
  )
  const captureOrderMutation = useMutation(
    ['capture-order'],
    (data: { orderId: string; promptId: number; data: any }) =>
      axios.post('/api/paypal/capture-order', data)
  )
  const createPaypalOrder = async () => {
    const {
      data: { orderId }
    } = await createOrderMutation.mutateAsync()
    console.log({ orderId })
    return orderId
  }
  const onApprove = async (data: any) => {
    await captureOrderMutation.mutateAsync({
      orderId: data.orderID,
      promptId,
      data
    })
    router.refresh()
  }
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        merchantId: merchantId,
        currency: 'USD'
      }}
    >
      <PayPalButtons
        style={{
          color: 'gold',
          shape: 'rect',
          label: 'pay',
          height: 50
        }}
        fundingSource={FUNDING.PAYPAL}
        createOrder={createPaypalOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  )
}
