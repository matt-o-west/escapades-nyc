// app/utils/storage.ts
import type { Plan } from '../types'

const STORAGE_KEY = 'escapades_plans'

export const storage = {
  // Get all plans from localStorage
  getPlans: (): Plan[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  // Get a single plan by ID
  getPlan: (id: string): Plan | undefined => {
    const plans = storage.getPlans()
    return plans.find((p) => p.id === id)
  },

  // Save all plans to localStorage
  savePlans: (plans: Plan[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
  },

  // Add a new plan
  addPlan: (plan: Plan): void => {
    const plans = storage.getPlans()
    plans.push(plan)
    storage.savePlans(plans)
  },

  // Update an existing plan
  updatePlan: (id: string, updates: Partial<Plan>): void => {
    const plans = storage.getPlans()
    const index = plans.findIndex((p) => p.id === id)
    if (index !== -1) {
      plans[index] = {
        ...plans[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
      storage.savePlans(plans)
    }
  },

  // Delete a plan
  deletePlan: (id: string): void => {
    const plans = storage.getPlans().filter((p) => p.id !== id)
    storage.savePlans(plans)
  },
}
