import { memo } from "react";
import { Link } from "react-router-dom";

import CardTitle from './CardTitle'
import CardDate from './CardDate'
import CardDeleteButton from './CardDeleteButton'

const Card = memo(({ index, id, title, created_at, onDelete }) => {
  return (
    <Link to={`/TodoDetail/${id}`}>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-60 flex flex-col mb-2 cursor-pointer" data-cy="activity-item" id={`itemTodo${index}`}>
        <div className="flex-grow">
          <CardTitle title={title} />
        </div>
        <div className="flex items-center justify-between">
          <CardDate date={created_at} />
          <CardDeleteButton onDelete={onDelete} />
        </div>
      </div>
    </Link>
  )
})

export default Card