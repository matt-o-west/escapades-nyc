import PlanCard from './PlanCard'
import type { Plan } from '@/types'

export default function Plans({ plans }: { plans: Plan[] }) {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  )
}
