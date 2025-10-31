import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plans/$id/$activityId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/plans/$id/$activityId"!</div>
}
