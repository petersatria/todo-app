import { memo } from "react";

const CardTitle = memo(({ title }) => {
  return <h3 className="text-xl font-bold" data-cy="activity-item-title">{title}</h3>
})

export default CardTitle