import { Link, useNavigate } from '@tanstack/react-router'
import type { Plan } from '@/types/index'
import { useEffect, useState } from 'react'
import CreateActivityModal from './CreateActivityModal'
import { storage } from '@/utils/storage'
import DeleteModal from './DeleteModal'
import ActivityCard from './ActivityCard'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import TimelineSidebar from './TimelineSidebar'

export default function PlanTimeline({ plan }: { plan: Plan }) {
  const navigate = useNavigate()
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false)
  const [isDeletePlanOpen, setIsDeletePlanOpen] = useState(false)
  const [activities, setActivities] = useState(plan.activities)

  // Monitor for drag and drop events
  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0]
        if (!destination) {
          // Dropped outside any drop target
          return
        }

        const sourceIndex = source.data.index
        const destinationIndex = destination.data.index

        // Type guards
        if (
          typeof sourceIndex !== 'number' ||
          typeof destinationIndex !== 'number'
        ) {
          return
        }

        // Don't do anything if dropped in same position
        if (sourceIndex === destinationIndex) {
          return
        }

        // Reorder the activities
        const reorderedActivities = Array.from(activities)
        const [movedActivity] = reorderedActivities.splice(sourceIndex, 1)
        reorderedActivities.splice(destinationIndex, 0, movedActivity)

        // Update state
        setActivities(reorderedActivities)

        // Save to storage
        storage.updatePlan(plan.id, { activities: reorderedActivities })
      },
    })
  }, [activities, plan.id])

  const refreshActivities = () => {
    const updatedPlan = storage.getPlan(plan.id)
    if (updatedPlan) {
      setActivities(updatedPlan.activities)
    }
  }

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

      {/* Plan Details Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">{plan.description}</p>
        <p className="text-sm text-gray-500">
          {new Date(plan.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Add Activity Button */}
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => setIsAddActivityOpen(true)}
      >
        + Add Activity
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Timeline Sidebar (Desktop Only) */}
        <TimelineSidebar activities={activities} />
        {/* Activities Timeline */}
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">
                No activities yet. Click '+ Add Activity' to start building your
                itinerary.
              </p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={index}
                onDelete={(activityId) => {
                  const updatedActivities = activities.filter(
                    (act) => act.id !== activityId,
                  )
                  storage.updatePlan(plan.id, {
                    activities: updatedActivities,
                  })
                  setActivities(updatedActivities)
                }}
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
