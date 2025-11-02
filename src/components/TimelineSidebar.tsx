// app/components/TimelineSidebar.tsx
import type { CalculatedActivity } from '../utils/timeCalcs'
import { formatTime, formatDuration } from '../utils/timeCalcs'

interface TimelineSidebarProps {
  activities: CalculatedActivity[]
}

export default function TimelineSidebar({ activities }: TimelineSidebarProps) {
  if (activities.length === 0) return null

  const earliestTime = activities[0]?.startTime || '00:00'
  const latestTime = activities[activities.length - 1]?.endTime || '00:00'

  return (
    <div className="hidden lg:block">
      <div className="sticky top-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-l from-blue-400 to-blue-700 text-white p-4">
          <h3 className="font-semibold text-lg">Timeline Preview</h3>
          <p className="text-blue-100 text-sm mt-1">
            {formatTime(earliestTime)} - {formatTime(latestTime)}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="p-4">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {/* Connecting Line */}
                {index < activities.length - 1 && (
                  <div className="absolute left-[15px] top-10 bottom-0 w-0.5 bg-gray-200" />
                )}

                <div className="flex gap-3">
                  {/* Numbered Dot */}
                  <div className="relative z-10 shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    {/* Time Range */}
                    <div className="text-sm font-semibold text-gray-900">
                      {formatTime(activity.startTime)}
                      <span className="text-gray-400 mx-1">→</span>
                      {formatTime(activity.endTime)}
                    </div>

                    {/* Duration */}
                    <div className="text-xs text-gray-500 mt-0.5">
                      {formatDuration(activity.duration)}
                    </div>

                    {/* Activity Name */}
                    <div className="text-sm text-gray-700 mt-1 font-medium line-clamp-1">
                      {activity.name}
                    </div>

                    {/* Type Badge */}
                    <div className="mt-1">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Summary */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            <span className="font-semibold">{activities.length}</span>{' '}
            activities
            <span className="mx-1">•</span>
            <span>
              {formatDuration(
                activities.reduce((sum, a) => sum + a.duration, 0),
              )}{' '}
              total
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
