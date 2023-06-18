import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { createOrder } from "@/lib/paypal/create-order";
import { getAccessToken } from "@/lib/paypal/authenticate";

export async function POST(request: NextRequest) {
  const { promptId, emailAddress } = await request.json()
  const prompt = await prisma.prompt.findFirst({ where: { id: promptId } })
  const settings = await prisma.siteSetting.findFirst({ where: { id: 1 } })
  if (!prompt || !settings) return NextResponse.json({ error: 'Prompt Not found' }, { status: 404 })
  let accessToken = ''
  try {
    accessToken = await getAccessToken(process.env.PAYPAL_CLIENT_ID || '',
      process.env.PAYPAL_CLIENT_SECRET || ''
    )
  } catch (error) {
    return NextResponse.json({ error: 'Problem with payment authentication' }, { status: 401 })
  }

  const platformFee = Number(prompt?.price.toFixed(2)) / 100 * Number(settings?.commissionRate.toFixed(2))
  const { data, status } = await createOrder({
    amount: Number(prompt?.price.toFixed(2)),
    accessToken: accessToken,
    bnCode: process.env.PAYPAL_APP_BN_CODE || '',
    payeeEmailAddress: emailAddress,
    platformFee: platformFee
  })
  console.log({ data })
  if (status !== 201) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
  await prisma.payement.create({ data: { orderId: data.id, status: 'PENDING' } })
  return NextResponse.json({ orderId: data.id })
}