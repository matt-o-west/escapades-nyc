// app/utils/mockData.ts
import type { Plan } from '@/types'

export const mockPlans: Plan[] = [
  {
    id: '1',
    title: 'Pizza Tasting',
    date: '2025-10-31',
    description: "We're tasting the best pizza across all 5 boroughs!",
    activities: [
      {
        id: '1',
        name: "Joe's Pizza",
        startTime: '18:00',
        endTime: '19:00',
        location: '7 Carmine St, Manhattan',
        type: 'dining',
        description: 'Classic NYC slice',
      },
      {
        id: '2',
        name: 'Lucali',
        startTime: '20:00',
        location: '575 Henry St, Brooklyn',
        type: 'dining',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Initialize localStorage with mock data on first load
export const initializeMockData = () => {
  console.log('Initializing mock data...')
  if (
    typeof window !== 'undefined' &&
    !localStorage.getItem('escapades_plans')
  ) {
    console.log('Setting mock data...')
    localStorage.setItem('escapades_plans', JSON.stringify(mockPlans))
    console.log('Storage: ', localStorage.getItem('escapades_plans'))
  }
}
