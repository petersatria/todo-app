import { memo } from "react";

const FormInput = memo(({ onInput, value }) => {
  return (
    <input
      className="px-5 py-4 w-full rounded-lg border"
      type="text"
      value={value}
      onInput={onInput}
      placeholder="Tambahkan nama list item"
      data-cy="modal-add-name-input"
    />
  )
})

export default FormInput