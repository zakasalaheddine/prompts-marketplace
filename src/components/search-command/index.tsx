'use client'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function SearchCommand({ ...props }) {
  return (
    <div className='flex w-full max-w-sm items-center space-x-2'>
      <Input type="text" placeholder="Search Prompts..." />
      <Button variant="outline" className='rounded-xl '>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  )
}
