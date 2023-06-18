import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db'
import { captureOrder } from '@/lib/paypal/capture-order'
import { getAccessToken } from '@/lib/paypal/authenticate'
import { auth } from '@clerk/nextjs'

export async function POST(request: NextRequest) {
  const { orderId, promptId } = await request.json()
  const { userId } = auth()
  if (!userId)
    return NextResponse.json(
      { error: 'Problem with payment authentication' },
      { status: 401 }
    )
  if (!orderId || !promptId)
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  let accessToken = ''
  try {
    accessToken = await getAccessToken(
      process.env.PAYPAL_CLIENT_ID || '',
      process.env.PAYPAL_CLIENT_SECRET || ''
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Problem with payment authentication' },
      { status: 401 }
    )
  }
  try {
    const { data } = await captureOrder({ accessToken, orderId })
    await prisma.payement.updateMany({
      where: { orderId },
      data: { status: 'PAID' }
    })
    await prisma.purchases.create({
      data: {
        promptId: promptId,
        userId: userId,
        orderData: JSON.stringify(data)
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Problem with saving your order' },
      { status: 500 }
    )
  }
}
