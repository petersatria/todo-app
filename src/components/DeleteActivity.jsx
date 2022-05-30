import { Dialog } from '@headlessui/react'
import { memo, useRef } from 'react'

import DeleteIcon from './DeleteIcon'

const DeleteActivity = memo(({ data, handleDelete, onClose }) => {
  let completeButtonRef = useRef(null)

  return (
    <Dialog
      initialFocus={completeButtonRef}
      open={!!data}
      onClose={onClose}
      className="fixed inset-0 z-50 grid place-items-center"
    >
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
      <div className="modal-delete relative grid place-items-center bg-white py-12 px-10 rounded-2xl z-20" data-cy="modal-delete">
        <DeleteIcon />
        <Dialog.Title className="text-xl w-full text-center py-10" data-cy="modal-delete-title">
          Apakah anda yakin menghapus activity
          <span className="font-bold"> “{data.title}”?</span>
        </Dialog.Title>

        <div className="grid grid-flow-col gap-5 w-full px-10">
          <button
            onClick={onClose}
            className="bg-gray-200 px-6 py-4 rounded-full font-semibold	"
            data-cy="modal-delete-cancel-button"
          >
            Batal
          </button>
          <button
            ref={completeButtonRef}
            onClick={handleDelete}
            className="bg-red-500 px-6 py-4 rounded-full text-white font-semibold	"
            data-cy="modal-delete-confirm-button"
          >
            Hapus
          </button>
        </div>
      </div>
    </Dialog>
  )
})

export default DeleteActivity