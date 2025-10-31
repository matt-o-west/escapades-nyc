import Plans from '@/components/Plans'
import { useEffect, useState } from 'react'
import { storage } from '@/utils/storage'
import { initializeMockData } from '@/utils/mockData'
import type { Plan } from '@/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    initializeMockData() // ← Initialize here
    setPlans(storage.getPlans())
  }, [])

  return (
    <div>
      <div className="align-center text-center flex flex-wrap justify-center p-8">
        <h1 className="w-full justify-center">Welcome to Escapades NYC!</h1>
        <p>
          Your gateway to unforgettable adventures in the city that never
          sleeps.
        </p>
      </div>
      <h2 className="w-80 p-8">Plans</h2>
      <div className="p-8 justify-center">
        {/* Event Feed */}
        <Plans plans={plans} />
      </div>
    </div>
  )
}
