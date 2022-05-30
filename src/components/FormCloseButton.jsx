import { memo } from "react";

const FormCloseButton = memo(({ onClose }) => {
  return (
    <button onClick={onClose} className="text-gray-400 hover:text-gray-500" data-cy="modal-add-close-button">
      <div className="close-button"></div>
    </button>
  )
})

export default FormCloseButton