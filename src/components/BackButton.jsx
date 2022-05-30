import { memo } from "react";
import { Link } from "react-router-dom";

const BackButton = memo(() => {
  return (
    <Link to="/">
      <div className="cursor-pointer" data-cy="todo-back-button">
        <div className="todo-back-button" />
      </div>
    </Link>
  )
})

export default BackButton