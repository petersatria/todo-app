import { memo } from "react";

const DeleteIcon = memo(() => {
  return (
    <div data-cy="modal-delete-icon" className="text-red-500">
      <div className="modal-delete-icon"></div>
    </div>
  )
})

export default DeleteIcon