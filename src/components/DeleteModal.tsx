import { Dialog, DialogClose } from './Dialog'

interface DeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description: string
  itemName?: string
}

export default function DeleteModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  itemName,
}: DeleteModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={title}>
      <div className="space-y-4">
        {/* Warning Message */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{description}</p>
          {itemName && (
            <p className="text-sm font-semibold text-red-900 mt-2">
              "{itemName}"
            </p>
          )}
        </div>

        {/* Info */}
        <p className="text-sm text-gray-600">
          This action cannot be undone. All data will be permanently deleted.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <DialogClose asChild>
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  )
}
