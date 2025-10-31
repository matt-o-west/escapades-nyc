import PlanCard from './PlanCard'
import type { Plan } from '@/types'

const mockPlans: Plan[] = [
  {
    id: '1',
    title: 'Plan 1',
    date: '2025-11-01',
    description: 'Description 1',
    activities: [],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    title: 'Plan 2',
    date: '2025-11-02',
    description: 'Description 2',
    activities: [],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '3',
    title: 'Plan 3',
    date: '2025-11-03',
    description: 'Description 3',
    activities: [],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '4',
    title: 'Plan 4',
    date: '2025-11-04',
    description: 'Description 4',
    activities: [],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '5',
    title: 'Plan 5',
    date: '2025-11-05',
    description: 'Description 5',
    activities: [],
    createdAt: '',
    updatedAt: '',
  },
]

export default function Plans({ plans }: { plans: Plan[] }) {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  )
}
