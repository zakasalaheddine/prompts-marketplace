import { DataTable } from '@/components/datatable'
import DashboardLayout from '@/components/layouts/dashboard'
import { columns } from './columns'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getPrompts = async () => {
  return await prisma.prompt.findMany({
    include: {
      category: { select: { name: true } },
      platform: { select: { name: true } }
    }
  })
}

export default async function Dashboard() {
  const data = await getPrompts()
  return (
    <DashboardLayout>
      <DataTable columns={columns} data={data} />
    </DashboardLayout>
  )
}
