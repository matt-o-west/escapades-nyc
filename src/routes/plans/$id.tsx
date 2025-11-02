import { createFileRoute, Link } from '@tanstack/react-router'
import { storage } from '@/utils/storage'
import type { Plan } from '@/types/index'
import Timeline from '@/components/Timeline'
import PlanNotFound from '@/components/PlanNotFound'

export const Route = createFileRoute('/plans/$id')({
  loader: ({ params }) => {
    return { plan: storage.getPlan(params.id) } // localStorage
  },
  component: Plan,
  notFoundComponent: PlanNotFound,
})

function Plan() {
  const { plan } = Route.useLoaderData()
  console.log('Loaded plan:', plan)
  return (
    <div>
      {/* Timeline Component */}
      <Timeline plan={plan} />
    </div>
  )
}
