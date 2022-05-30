import { memo } from "react"

const AddButton = memo(({ onClick, dataCy }) => {
  return <button onClick={onClick} className="flex items-center gap-3 px-8 py-4 text-xl font-semibold rounded-full bg-primary text-white" data-cy={dataCy}>
    <div className="todo-icon-plus"></div>
    Tambah
  </button>
})

export default AddButton