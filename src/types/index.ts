export type ActivityType = 'dining' | 'event' | 'bar' | 'activity' | 'transit'

export interface Activity {
  id: string
  name: string
  duration: number // minutes
  location: string
  type: ActivityType
  description?: string
  order?: number // This is for drag and drop
}

export interface Plan {
  id: string
  title: string
  date: string // ISO date string
  startTime: string // When plan starts
  description: string
  activities: Activity[]
  createdAt: string
  updatedAt: string
}
