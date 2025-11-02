// app/utils/timeCalculations.ts
import type { Activity } from '../types'

export interface CalculatedActivity extends Activity {
  startTime: string
  endTime: string
}

export const calculateActivityTimes = (
  activities: Activity[],
  planStartTime: string,
): CalculatedActivity[] => {
  let currentTime = planStartTime

  return activities.map((activity) => {
    const startTime = currentTime
    const endTime = addMinutes(currentTime, activity.duration)

    currentTime = endTime // Next activity starts when this one ends

    return {
      ...activity,
      startTime,
      endTime,
    }
  })
}

// Helper to add minutes to a time string
export const addMinutes = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + mins + minutes

  const newHours = Math.floor(totalMinutes / 60) % 24
  const newMins = totalMinutes % 60

  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`
}

// Helper to format time for display (24h -> 12h)
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

// Helper to format duration
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${mins}m`
  }
}
