import { Link } from '@tanstack/react-router'

export default function PlanNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-center space-y-4">
        {/* Icon/Placeholder - replace with graphic later */}
        <div className="text-6xl mb-4">🗺️</div>

        <h1 className="text-3xl font-bold text-gray-900">Plan Not Found</h1>

        <p className="text-gray-600 max-w-md">
          We couldn't find the plan you're looking for. It may have been deleted
          or doesn't exist.
        </p>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← Back to My Plans
          </Link>
        </div>
      </div>
    </div>
  )
}
