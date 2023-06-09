import { prisma } from "@/db";
import { isCurrentUserAdmin } from "@/lib/isAdmin";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const isAdmin = await isCurrentUserAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { promptId, status } = await req.json();
  await prisma.prompt.update({ where: { id: Number(promptId) }, data: { status: status } })
  return NextResponse.json({ updated: true })
}