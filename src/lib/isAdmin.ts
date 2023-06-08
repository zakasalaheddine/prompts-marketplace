import { auth, clerkClient } from "@clerk/nextjs"

export const isCurrentUserAdmin = async () => {
  let isAdmin = false
  try {
    const { userId } = auth()
    if (userId) {
      const user = await clerkClient.users.getUser(userId)
      if (user.privateMetadata.role === 'admin') isAdmin = true
    }
  } catch (error) { }
  return isAdmin
}