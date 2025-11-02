import type { Activity } from '../types'

interface TimelineSidebarProps {
  activities: Activity[]
}

export default function TimelineSidebar({ activities }: TimelineSidebarProps) {
  // Sort activities by start time for the timeline view
  const sortedActivities = [...activities].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  )

  // Calculate time range for the timeline
  const getTimeRange = () => {
    if (activities.length === 0) return { earliest: '00:00', latest: '23:59' }

    const times = activities.flatMap(
      (a) => [a.startTime, a.endTime].filter(Boolean) as string[],
    )
    const sorted = times.sort()

    return {
      earliest: sorted[0],
      latest: sorted[sorted.length - 1] || sorted[0],
    }
  }

  const { earliest, latest } = getTimeRange()

  // Helper to format time for display
  const formatTime = (time: string) => {
    // Convert 24h to 12h format if needed
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Helper to calculate duration
  const getDuration = (start: string, end?: string) => {
    if (!end) return null

    const [startHour, startMin] = start.split(':').map(Number)
    const [endHour, endMin] = end.split(':').map(Number)

    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin

    const duration = endMinutes - startMinutes
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${minutes}m`
    }
  }

  if (activities.length === 0) {
    return null // Don't show sidebar if no activities
  }

  return (
    <div className="hidden lg:block">
      <div className="sticky top-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-l from-blue-400 to-blue-600 text-white p-4">
          <h3 className="font-semibold text-lg">Timeline</h3>
          <p className="text-blue-100 text-sm mt-1">
            {formatTime(earliest)} - {formatTime(latest)}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="p-4">
          <div className="space-y-4">
            {sortedActivities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {/* Connecting Line (except for last item) */}
                {index < sortedActivities.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gray-200" />
                )}

                {/* Timeline Entry */}
                <div className="flex gap-3">
                  {/* Dot */}
                  <div className="relative z-10 shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    {/* Time */}
                    <div className="text-sm font-semibold text-gray-900">
                      {formatTime(activity.startTime)}
                      {activity.endTime && (
                        <>
                          <span className="text-gray-400 mx-1">→</span>
                          {formatTime(activity.endTime)}
                        </>
                      )}
                    </div>

                    {/* Duration */}
                    {activity.endTime && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {getDuration(activity.startTime, activity.endTime)}
                      </div>
                    )}

                    {/* Activity Name */}
                    <div className="text-sm text-gray-700 mt-1 line-clamp-1">
                      {activity.name}
                    </div>

                    {/* Type Badge */}
                    <div className="mt-1">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
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
            {sortedActivities[0]?.endTime && (
              <>
                <span className="mx-1">•</span>
                <span>{getDuration(earliest, latest) || 'TBD'} total</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
