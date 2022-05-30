import { memo } from "react"

import PriorityIndicator from './PriorityIndicator'

const TodoItem = memo(({ todo, onChangeIsActive, onDelete, onEdit }) => {

  const editIcon = <div className="todo-edit-item"></div>

  const deleteIcon = <div className="todo-icon-trash"></div>

  return (
    <div data-cy="todo-item" className="relative flex items-center gap-5 bg-white p-8 border rounded-xl mb-3 shadow-md" >
      <input className="h-5 w-5 cursor-pointer" onChange={onChangeIsActive} type="checkbox" data-cy="todo-item-checkbox" data-checked={!todo.is_active} checked={!todo.is_active} />
      <PriorityIndicator
        data-cy="todo-item-priority-indicator"
        priority={todo.priority}
      />
      <p data-cy="todo-item-title" className={`text-xl font-medium ${!todo.is_active && 'line-through opacity-50'}`}>
        {todo.title}
      </p>
      <button onClick={() => onEdit(todo)} data-cy="todo-item-edit-button">
        {editIcon}
      </button>
      <button data-cy="todo-item-delete-button" onClick={() => onDelete(todo)} className="absolute top-1/2 -translate-y-1/2 right-5 h-full w-14 grid place-items-center">
        {deleteIcon}
      </button>
    </div>
  )
})

export default TodoItem