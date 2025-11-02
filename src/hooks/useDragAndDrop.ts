import { useEffect } from 'react'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import type { Activity } from '../types'

interface UseDragAndDropProps {
  activities: Activity[]
  onReorder: (reorderedActivities: Activity[]) => void
}

export function useDragAndDrop({ activities, onReorder }: UseDragAndDropProps) {
  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0]
        if (!destination) return

        const sourceIndex = source.data.index
        const destinationIndex = destination.data.index

        // Type guards
        if (
          typeof sourceIndex !== 'number' ||
          typeof destinationIndex !== 'number' ||
          sourceIndex === destinationIndex
        ) {
          return
        }

        // Reorder the activities
        const reorderedActivities = Array.from(activities)
        const [movedActivity] = reorderedActivities.splice(sourceIndex, 1)
        reorderedActivities.splice(destinationIndex, 0, movedActivity)

        // Call the provided callback
        onReorder(reorderedActivities)
      },
    })
  }, [activities, onReorder])
}
