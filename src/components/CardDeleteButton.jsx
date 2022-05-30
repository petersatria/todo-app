import { memo } from "react";

const CardDeleteButton = memo(({ onDelete }) => {
  const deleteIcon = <div className="todo-icon-trash"></div>

  return (
    <button onClick={onDelete} data-cy="activity-item-delete-button">
      {deleteIcon}
    </button>
  )
})

export default CardDeleteButton