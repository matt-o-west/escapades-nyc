import { Link } from '@tanstack/react-router'
import type { Plan } from '@/types'

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Link
      to="/plans/$id"
      params={{ id: plan.id }}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 block"
    >
      {/* Date */}
      <div className="text-sm text-gray-500 mb-2">
        {new Date(plan.date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>

      {/* Plan Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.title}</h3>

      {/* Description Preview */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {plan.description}
      </p>

      {/* Footer: Activity count and start time */}
      <div className="flex items-center text-sm text-gray-500">
        <span>{plan.activities.length} activities</span>
        {plan.activities.length > 0 && plan.activities[0].startTime && (
          <>
            <span className="mx-2">•</span>
            <span>Starts {plan.activities[0].startTime}</span>
          </>
        )}
      </div>
    </Link>
  )
}
