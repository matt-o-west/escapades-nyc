import { Link, useNavigate } from '@tanstack/react-router'
import type { Plan } from '@/types/index'
import { useState } from 'react'
import CreateActivityModal from './CreateActivityModal'
import { storage } from '@/utils/storage'
import DeleteModal from './DeleteModal'
import ActivityCard from './ActivityCard'
import TimelineSidebar from './TimelineSidebar'
import { usePlanActivities } from '@/hooks/usePlanActivities'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { calculateActivityTimes } from '@/utils/timeCalcs'
import { formatTime } from '@/utils/timeCalcs'

export default function PlanTimeline({ plan }: { plan: Plan }) {
  const navigate = useNavigate()
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false)
  const [isDeletePlanOpen, setIsDeletePlanOpen] = useState(false)

  // Custom hook for managing activity state and save/cancel
  const {
    currentActivities,
    hasUnsavedChanges,
    setCurrentActivities,
    handleSave,
    handleCancel,
    refreshActivities,
    deleteActivity,
  } = usePlanActivities({
    planId: plan.id,
    initialActivities: plan.activities,
  })

  // Custom hook for drag and drop
  useDragAndDrop({
    activities: currentActivities,
    onReorder: setCurrentActivities,
  })

  // Calculate times for display
  const calculatedActivities = calculateActivityTimes(
    currentActivities,
    plan.startTime,
  )

  console.log('calculatedActivities:', calculatedActivities, plan.startTime)

  const handleDeletePlan = () => {
    storage.deletePlan(plan.id)
    navigate({ to: '/' }) // Redirect to home after delete
  }

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
        <button
          className="ml-auto text-red-600 hover:text-red-700"
          onClick={() => setIsDeletePlanOpen(true)}
          aria-label="Delete Plan"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Plan Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">{plan.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>
            📅{' '}
            {new Date(plan.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span>•</span>
          <span>🕐 Starts at {formatTime(plan.startTime)}</span>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-yellow-600">⚠️</div>
              <div>
                <p className="font-medium text-yellow-800">Unsaved Changes</p>
                <p className="text-sm text-yellow-700">
                  You've reordered activities. Save to update the timeline, or
                  cancel to revert.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>How it works:</strong> Drag activities to try different
          orders. The timeline updates in real-time to show you the schedule.
          Click <strong>Save Order</strong> when you're happy with the
          arrangement.
        </p>
      </div>

      {/* Add Activity Button */}
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => setIsAddActivityOpen(true)}
      >
        + Add Activity
      </button>

      {/* Main Content: Timeline + Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Timeline Sidebar */}
        <TimelineSidebar activities={calculatedActivities} />

        {/* Activity Cards */}
        <div className="space-y-4">
          {currentActivities.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg mb-2">
                No activities yet. Click '+ Add Activity' to start building your
                itinerary.
              </p>
            </div>
          ) : (
            calculatedActivities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={index}
                onDelete={deleteActivity}
              />
            ))
          )}
        </div>
      </div>
      <CreateActivityModal
        open={isAddActivityOpen}
        onOpenChange={setIsAddActivityOpen}
        planId={plan.id}
        onSuccess={refreshActivities}
      />
      <DeleteModal
        open={isDeletePlanOpen}
        onOpenChange={setIsDeletePlanOpen}
        onConfirm={handleDeletePlan}
        title="Delete Plan"
        description="Are you sure you want to delete this plan? All activities will be permanently removed."
        itemName={plan.title}
      />
    </div>
  )
}
