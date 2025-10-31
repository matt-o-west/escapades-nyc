export type ActivityType = 'dining' | 'event' | 'bar' | 'activity' | 'transit'

export interface Activity {
  id: string
  name: string
  startTime: string // ISO string or "HH:mm"
  endTime?: string
  location: string
  type: ActivityType
  description?: string
}

export interface Plan {
  id: string
  title: string
  date: string // ISO date string
  description: string
  activities: Activity[]
  createdAt: string
  updatedAt: string
}
