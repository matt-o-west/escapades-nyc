import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plans/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id } = params
        return new Response(`Plan Id: ${id}`)
      },
    },
  },
})

function RouteComponent() {
  return <div>Hello "/plans/$id"!</div>
}
