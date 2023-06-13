import { UserProfile } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const UserProfilePage = () => (
  <main className="flex items-center justify-center flex-col gap-4 py-4">
    <Link href="/" className='flex'>
      <ArrowLeft /> Back to Home Page
    </Link>
    <UserProfile path="/profile" routing="path" />
  </main>
)

export default UserProfilePage
