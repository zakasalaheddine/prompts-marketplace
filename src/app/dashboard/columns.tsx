'use client'

import { DataTableColumnHeader } from '@/components/datatable/column-header'
import { Prompt } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Loader2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

interface IUpdatePromptStatus {
  promptId: string
  status: 'PUBLISHED' | 'DECLINED'
}

const updatePromptStatus = async ({
  promptId,
  status
}: IUpdatePromptStatus) => {
  await axios.put('/api/prompt', { promptId, status })
}

const Actions = ({
  prompt
}: {
  prompt: Prompt & {
    category: {
      name: string
    }
    platform: {
      name: string
    }
  }
}) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: updatePromptStatus,
    mutationKey: ['update-prompt'],
    onMutate: () => {
      toast({
        title: 'Running the update',
        description: <Loader2 className="animate-spin" />
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['draft-prompts'])
      toast({
        title: 'Prompt is updated'
      })
    },
    onError: () => {
      toast({
        title: "Updates wasn't passed as it should be",
        variant: 'destructive'
      })
    }
  })
  const { toast } = useToast()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigator.clipboard.writeText(`${prompt.prompt}`)}
        >
          Copy Prompt
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            await mutateAsync({ promptId: `${prompt.id}`, status: 'PUBLISHED' })
          }}
        >
          Publish Prompt
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={async () => {
            await mutateAsync({ promptId: `${prompt.id}`, status: 'DECLINED' })
          }}
        >
          Decline Prompt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<
  Prompt & {
    category: {
      name: string
    }
    platform: {
      name: string
    }
  }
>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    )
  },
  {
    accessorKey: 'platform.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform" />
    )
  },
  {
    accessorKey: 'category.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    )
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions prompt={row.original} />
  }
]
