import { createFileRoute, Link } from '@tanstack/react-router'
import { storage } from '@/utils/storage'
import type { Plan } from '@/types/index'
import Timeline from '@/components/Timeline'

export const Route = createFileRoute('/plans/$id')({
  loader: ({ params }) => {
    return { plan: storage.getPlan(params.id) } // localStorage
  },
  component: Plan,
})

function Plan() {
  const { plan } = Route.useLoaderData()
  console.log('Loaded plan:', plan)
  return (
    <div>
      {plan ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{plan.title}</h1>
          <p className="text-gray-600 mb-6">{plan.description}</p>

          {/* Timeline Component */}
          <Timeline plan={plan} />
        </div>
      ) : (
        <p>Plan not found.</p>
      )}
    </div>
  )
}
