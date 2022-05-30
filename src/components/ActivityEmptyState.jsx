import { memo } from "react";
import '../styles/main.css';

const ActivityEmptyState = memo(() => {
  return (
    <div className="flex justify-center" data-cy="activity-empty-state">
      <span className='todo-activity-empty' />
    </div>
  )
})

export default ActivityEmptyState