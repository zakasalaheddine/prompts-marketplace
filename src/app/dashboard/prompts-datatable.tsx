'use client'

import { useQuery } from '@tanstack/react-query'
import { Prompt } from '@prisma/client'
import { DataTable } from '@/components/datatable'
import { columns } from './columns'
import axios from 'axios'

export const getPrompts = async () => {
  const { data } = await axios.get<
    (Prompt & {
      category: {
        name: string
      }
      platform: {
        name: string
      }
    })[]
  >('/api/prompt')
  return data
}

type PromptsDataTableProps = {
  prompts: (Prompt & {
    category: {
      name: string
    }
    platform: {
      name: string
    }
  })[]
}

export default function PromptsDataTable({ prompts }: PromptsDataTableProps) {
  const { data, isFetching } = useQuery(
    ['draft-prompts'],
    getPrompts,
    {
      initialData: prompts
    }
  )
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isFetching}
    />
  )
}
