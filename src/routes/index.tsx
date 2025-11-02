import Plans from '@/components/Plans'
import { useEffect, useState } from 'react'
import { storage } from '@/utils/storage'
import { initializeMockData } from '@/utils/mockData'
import type { Plan } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import CreatePlanModal from '@/components/CreatePlanModal'

export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return { plans: storage.getPlans() } // Replace this with DB call later
  },
})

function App() {
  const loaderData = Route.useLoaderData()
  const [plans, setPlans] = useState<Plan[]>(loaderData.plans)
  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log('Loaded plans:', plans)

  const refreshPlans = () => {
    const updatedPlans = storage.getPlans()
    setPlans(updatedPlans)
  }

  // Initialize on client mount
  useEffect(() => {
    initializeMockData()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="align-center text-center flex flex-wrap justify-center p-8">
        <h1 className="w-full justify-center">Welcome to Escapades NYC!</h1>
        <p>
          Your gateway to unforgettable adventures in the city that never
          sleeps.
        </p>
      </div>
      <h2 className="w-80 p-8">Plans</h2>
      <div className="flex justify-center md:justify-start md:mx-8 mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Create Escapade
        </button>
      </div>
      <CreatePlanModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={refreshPlans}
      />
      <div className="p-8 justify-center">
        {/* Event Feed */}
        <Plans plans={plans} />
      </div>
    </div>
  )
}
