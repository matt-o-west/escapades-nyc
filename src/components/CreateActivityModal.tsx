import { useState, FormEvent } from 'react'
import { Dialog, DialogClose } from './Dialog'
import { storage } from '../utils/storage'
import type { Activity, ActivityType } from '../types'

interface AddActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planId: string
  onSuccess: () => void
}

const ACTIVITY_TYPES: { value: ActivityType; label: string }[] = [
  { value: 'dining', label: 'Dining' },
  { value: 'event', label: 'Event' },
  { value: 'bar', label: 'Bar/Nightlife' },
  { value: 'activity', label: 'Activity' },
  { value: 'transit', label: 'Transit' },
]

export default function CreateActivityModal({
  open,
  onOpenChange,
  planId,
  onSuccess,
}: AddActivityDialogProps) {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState<ActivityType>('dining')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!name.trim() || !startTime || !location.trim()) {
      setError('Activity name, time, and location are required')
      return
    }

    // Create new activity
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      name: name.trim(),
      startTime,
      endTime: endTime || undefined,
      location: location.trim(),
      type,
      description: description.trim() || undefined,
    }

    // Get current plan and add activity
    const plan = storage.getPlan(planId)
    if (plan) {
      const updatedActivities = [...plan.activities, newActivity]
      // Sort by start time
      updatedActivities.sort((a, b) => a.startTime.localeCompare(b.startTime))

      storage.updatePlan(planId, {
        activities: updatedActivities,
      })
    }

    // Reset form
    resetForm()

    // Close dialog and refresh
    onOpenChange(false)
    onSuccess()
  }

  const resetForm = () => {
    setName('')
    setStartTime('')
    setEndTime('')
    setLocation('')
    setType('dining')
    setDescription('')
    setError('')
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Add Activity"
      description="Add an activity to your itinerary. Activities will be sorted chronologically."
      preventOutsideClose={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Activity Name */}
        <fieldset className="space-y-2">
          <label
            htmlFor="activity-name"
            className="block text-sm font-medium text-gray-700"
          >
            Activity Name
          </label>
          <input
            id="activity-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Dinner at Joe's Pizza"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </fieldset>

        {/* Time - Start and End */}
        <div className="grid grid-cols-2 gap-4">
          <fieldset className="space-y-2">
            <label
              htmlFor="start-time"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </fieldset>

          <fieldset className="space-y-2">
            <label
              htmlFor="end-time"
              className="block text-sm font-medium text-gray-700"
            >
              End Time (Optional)
            </label>
            <input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </fieldset>
        </div>

        {/* Location */}
        <fieldset className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., 7 Carmine St, Manhattan"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </fieldset>

        {/* Type Dropdown */}
        <fieldset className="space-y-2">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as ActivityType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
          >
            {ACTIVITY_TYPES.map((activityType) => (
              <option key={activityType.value} value={activityType.value}>
                {activityType.label}
              </option>
            ))}
          </select>
        </fieldset>

        {/* Description */}
        <fieldset className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add notes about this activity..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
          />
        </fieldset>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Activity
          </button>
        </div>
      </form>
    </Dialog>
  )
}
