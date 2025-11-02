import { useState, useCallback } from 'react'
import { storage } from '../utils/storage'
import type { Activity } from '../types'

interface UsePlanActivitiesProps {
  planId: string
  initialActivities: Activity[]
}

export function usePlanActivities({
  planId,
  initialActivities,
}: UsePlanActivitiesProps) {
  // Saved state (persisted in storage)
  const [savedActivities, setSavedActivities] = useState(initialActivities)

  // Current state (being edited)
  const [currentActivities, setCurrentActivities] = useState(initialActivities)

  // Check if there are unsaved changes
  const hasUnsavedChanges =
    JSON.stringify(savedActivities) !== JSON.stringify(currentActivities)

  // Save the current order
  const handleSave = useCallback(() => {
    storage.updatePlan(planId, { activities: currentActivities })
    setSavedActivities(currentActivities)
  }, [planId, currentActivities])

  // Revert to saved order
  const handleCancel = useCallback(() => {
    setCurrentActivities(savedActivities)
  }, [savedActivities])

  // Refresh from storage (after adding new activity)
  const refreshActivities = useCallback(() => {
    const updatedPlan = storage.getPlan(planId)
    if (updatedPlan) {
      setSavedActivities(updatedPlan.activities)
      setCurrentActivities(updatedPlan.activities)
    }
  }, [planId])

  // Delete an activity
  const deleteActivity = useCallback(
    (activityId: string) => {
      const updated = currentActivities.filter((a) => a.id !== activityId)
      setCurrentActivities(updated)
      storage.updatePlan(planId, { activities: updated })
      setSavedActivities(updated)
    },
    [planId, currentActivities],
  )

  return {
    savedActivities,
    currentActivities,
    hasUnsavedChanges,
    setCurrentActivities,
    handleSave,
    handleCancel,
    refreshActivities,
    deleteActivity,
  }
}
