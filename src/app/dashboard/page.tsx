import DashboardLayout from '@/components/layouts/dashboard'
import PromptsDataTable from './prompts-datatable'
import { prisma } from '@/db'

export const queryPrompts = async () =>
  await prisma.prompt.findMany({
    where: { status: 'DRAFT' },
    include: {
      category: { select: { name: true } },
      platform: { select: { name: true } }
    }
  })

export default async function Dashboard() {
  const data = await queryPrompts()
  return (
    <DashboardLayout>
      <PromptsDataTable prompts={data} />
    </DashboardLayout>
  )
}
