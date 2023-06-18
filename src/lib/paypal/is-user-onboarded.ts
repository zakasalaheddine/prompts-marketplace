import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";

export async function isUserOnboarded() {
  const { userId } = auth()
  if (userId) {
    const findOnboardedUser = await prisma.paypalOnboardedUsers.findFirst({ where: { userId } })
    if (findOnboardedUser) return true
  }
  return false
}