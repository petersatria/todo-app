import { memo } from "react";

const FormTitle = memo(({ title }) => {
  return (
    <h1 className="text-xl font-semibold" data-cy="modal-add-title">{title}</h1>
  )
})

export default FormTitle