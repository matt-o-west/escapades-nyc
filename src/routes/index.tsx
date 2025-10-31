import Plans from '@/components/Plans'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
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
        <Plans />
      </div>
    </div>
  )
}
