import { useNavigate } from '@tanstack/react-router'
import { useState, FormEvent } from 'react'
import { Dialog, DialogClose } from './Dialog'
import { storage } from '../utils/storage'
import type { Plan } from '../types'

interface CreatePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export default function CreatePlanModal({
  open,
  onOpenChange,
  onSuccess,
}: CreatePlanModalProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!title.trim() || !date || !description.trim()) {
      setError('All fields are required')
      return
    }

    // Create new plan
    const newPlan: Plan = {
      id: crypto.randomUUID(),
      title: title.trim(),
      date,
      description: description.trim(),
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save to storage
    storage.addPlan(newPlan)

    // Reset form
    resetForm()

    // Close dialog and navigate to new plan
    onOpenChange(false)
    navigate({
      to: '/plans/$id',
      params: { id: newPlan.id },
      replace: true,
    })
  }

  const resetForm = () => {
    setTitle('')
    setDate('')
    setDescription('')
    setError('')
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Create Escapade"
      description="Plan your next NYC adventure. Add activities after creating your plan."
      preventOutsideClose={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Title Field */}
        <fieldset className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Plan Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Brooklyn Food Tour"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </fieldset>

        {/* Date Field */}
        <fieldset className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </fieldset>

        {/* Description Field */}
        <fieldset className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your plan..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
          />
        </fieldset>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Plan
          </button>
        </div>
      </form>
    </Dialog>
  )
}
