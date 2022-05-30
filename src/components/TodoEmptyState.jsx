import { memo } from "react";
import '../styles/main.css';

const TodoEmptyState = memo(() => {
  return (
    <div data-cy="todo-empty-state" className="flex justify-center">
      <span className='todo-empty-state' />
    </div>

  )
})

export default TodoEmptyState