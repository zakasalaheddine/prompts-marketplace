import { prisma } from '@/db'
import { getAccessToken } from '@/lib/paypal/authenticate'
import { generateLinks } from '@/lib/paypal/generate-onboarding-link'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { userId } = auth()
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const accessToken = await getAccessToken(
    process.env.PAYPAL_CLIENT_ID || '',
    process.env.PAYPAL_CLIENT_SECRET || ''
  )
  const links = await generateLinks({
    accessToken,
    trackingId: userId,
    returnUrl: 'http://localhost:3000/sell'
  })
  console.log({ links })
  return NextResponse.json({ links })
}

export async function POST(request: NextRequest) {
  const { userId } = auth()
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { merchantId, paypalEmail } = await request.json()
  if (!merchantId)
    return NextResponse.json(
      { error: 'Onboarding not worked correctly' },
      { status: 401 }
    )
  await prisma.paypalOnboardedUsers.create({
    data: { userId, paypalMerchantId: merchantId, paypalEmail }
  })
  return NextResponse.json({ success: true })
}
