import React, { useCallback, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchCommand() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const runSearch = useCallback(() => {
    const params = new URLSearchParams()
    params.set('search', searchQuery)

    router.push(`/?${params.toString()}`)
    // eslint-disable-next-line
  }, [searchQuery])
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search Prompts..."
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
      />
      <Button variant="outline" className="rounded-xl " onClick={runSearch}>
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
