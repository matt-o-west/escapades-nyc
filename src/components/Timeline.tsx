import { Link } from '@tanstack/react-router'
import type { Plan } from '@/types/index'

export default function PlanTimeline({ plan }: { plan: Plan }) {
  return (
    <div className="p-8 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{plan.title}</h1>
        <button className="ml-auto text-red-600 hover:text-red-700">🗑️</button>
      </div>

      {/* Plan Details Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">{plan.description}</p>
        <p className="text-sm text-gray-500">
          {new Date(plan.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Add Activity Button */}
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        + Add Activity
      </button>

      {/* Activities Timeline */}
      <div className="space-y-4">
        {plan.activities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">
              No activities yet. Click '+ Add Activity' to start building your
              itinerary
            </p>
          </div>
        ) : (
          plan.activities
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((activity, index) => (
              <div
                key={activity.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Activity Number */}
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                    {index + 1}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1">
                    {/* Type Badge and Time */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase">
                        {activity.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {activity.startTime}
                        {activity.endTime && ` - ${activity.endTime}`}
                      </span>
                    </div>

                    {/* Activity Name */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {activity.name}
                    </h3>

                    {/* Location */}
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {activity.location}
                    </p>

                    {/* Description */}
                    {activity.description && (
                      <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                        {activity.description}
                      </p>
                    )}
                  </div>

                  {/* Drag Handle (for later) */}
                  <div className="flex-shrink-0 text-gray-400 cursor-move">
                    ⋮⋮
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}
