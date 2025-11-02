import { Activity } from '@/types'
import { useEffect, useRef, useState } from 'react'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import type { CalculatedActivity } from '../utils/timeCalcs'
import { formatTime, formatDuration } from '../utils/timeCalcs'

interface ActivityCardProps {
  activity: Activity
  index: number
  onDelete: (activityId: string) => void
}

export default function ActivityCard({
  activity,
  index,
  onDelete,
}: ActivityCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isDragged, setIsDragged] = useState(false)

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return
    }

    // Make the card draggable
    const cleanupDraggable = draggable({
      element: el,
      getInitialData: () => ({
        activityId: activity.id,
        index,
      }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    })

    // Make the card a drop target
    const cleanupDropTarget = dropTargetForElements({
      element: el,
      getData: () => ({ index }),
      onDragEnter: () => setIsDragged(true),
      onDragLeave: () => setIsDragged(false),
      onDrop: () => setIsDragged(false),
    })

    // Cleanup both on unmount
    return () => {
      cleanupDraggable()
      cleanupDropTarget()
    }
  }, [activity.id, index])

  return (
    <div
      key={activity.id}
      ref={ref}
      className={`bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow ${isDragging ? 'opacity-40' : 'opacity-100'}
        ${isDragged ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`}
    >
      <div className="flex items-start gap-4">
        {/* Activity Number */}
        <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
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
              {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
            </span>
            <span className="text-xs text-gray-400">
              ({formatDuration(activity.duration)})
            </span>
          </div>

          {/* Activity Name */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {activity.name}
          </h3>

          {/* Location */}
          <p className="text-sm text-gray-600 mb-2">📍 {activity.location}</p>

          {/* Description */}
          {activity.description && (
            <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
              {activity.description}
            </p>
          )}
        </div>

        {/* Drag Handle (for later) */}
        <div className="shrink-0 flex flex-row gap-2 items-center">
          <div className="shrink-0 text-gray-400 cursor-move">
            <svg
              width="17"
              height="17"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.49998 4.09998C2.27906 4.09998 2.09998 4.27906 2.09998 4.49998C2.09998 4.72089 2.27906 4.89998 2.49998 4.89998H12.5C12.7209 4.89998 12.9 4.72089 12.9 4.49998C12.9 4.27906 12.7209 4.09998 12.5 4.09998H2.49998ZM2.49998 6.09998C2.27906 6.09998 2.09998 6.27906 2.09998 6.49998C2.09998 6.72089 2.27906 6.89998 2.49998 6.89998H12.5C12.7209 6.89998 12.9 6.72089 12.9 6.49998C12.9 6.27906 12.7209 6.09998 12.5 6.09998H2.49998ZM2.09998 8.49998C2.09998 8.27906 2.27906 8.09998 2.49998 8.09998H12.5C12.7209 8.09998 12.9 8.27906 12.9 8.49998C12.9 8.72089 12.7209 8.89998 12.5 8.89998H2.49998C2.27906 8.89998 2.09998 8.72089 2.09998 8.49998ZM2.49998 10.1C2.27906 10.1 2.09998 10.2791 2.09998 10.5C2.09998 10.7209 2.27906 10.9 2.49998 10.9H12.5C12.7209 10.9 12.9 10.7209 12.9 10.5C12.9 10.2791 12.7209 10.1 12.5 10.1H2.49998Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation() // Prevent drag when clicking delete
              onDelete(activity.id)
            }}
            className="text-red-500 hover:text-red-700 transition-colors text-sm"
            aria-label={`Delete ${activity.name}`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
