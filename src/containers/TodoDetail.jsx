import { Suspense, useEffect, useState, lazy } from "react"
import { useParams } from "react-router-dom";
import sorting from "../priority/sorting";
import DeleteActivity from '../components/DeleteActivity'
import Form from '../components/Form'
import AlertActivity from '../components/AlertActivity'

import useTodos from "../services/useTodos"
import useActivity from "../services/useActivity"
import BackButton from '../components/BackButton'
import PageTitle from '../components/PageTitle'
import TodoItem from '../components/TodoItem'
import TodoSorter from "../components/TodoSorter"
import AddButton from '../components/AddButton'

const TodoEmptyState = lazy(() => import("../components/TodoEmptyState"))

function DetailItem() {
  const [todos, setTodos] = useState([])
  const [activityTitle, setActivityTitle] = useState('')
  const [editActivityTitle, setEditActivityTitle] = useState(false)
  const [editedTodo, setEditedTodo] = useState(null)

  const [sortType, setSortType] = useState('Terbaru')
  const [deleteTodoData, setDeleteTodoData] = useState(null)
  const [openForm, setOpenForm] = useState(false)
  const [AlertActivityMessage, setAlertActivityMessage] = useState(null)

  const Todo = useTodos()
  const Activity = useActivity()
  let params = useParams();

  useEffect(async () => {
    const data = await Todo.get(params.id)
    setActivityTitle(data.title)
    setTodos(data.todo_items)

    return () => {
      setActivityTitle('')
      setTodos([])
    }
  }, [])

  const changeSortBy = (value) => {
    setSortType(value)
    setTodos(sorting(todos, value))
  }

  const submitTodo = async (name, priority) => {
    const todoData = {
      activity_group_id: params.id,
      title: name,
      priority
    }
    if (!!editedTodo) {
      const resdata = await Todo.update(editedTodo.id, todoData)
      const updatedTodo = todos.map(todo => todo.id === editedTodo.id ? resdata : todo)
      setTodos(updatedTodo)
    } else {
      const data = await Todo.create({ activity_group_id: params.id, title: name, priority })
      setTodos(todo => [data, ...todo])
    }
    setOpenForm(false)
  }

  const openDeleteModal = (todo) => {
    setDeleteTodoData(todo)
  }

  const handleDeleteTodo = async () => {
    await Todo.remove(deleteTodoData.id)
    const newAc = todos.filter(todo => todo.id !== deleteTodoData.id)
    setTodos(newAc)
    setDeleteTodoData(null)
    setAlertActivityMessage('Todo berhasil dihapus')
  }

  const handleChangeIsActive = async (id, data) => {
    const resData = await Todo.update(id, data)
    setTodos(todos => todos.map(todo =>
      todo.id === id ? { ...todo, is_active: resData.is_active } : todo
    ))
  }

  const handleEditTodo = (todo) => {
    setEditedTodo(todo)
    setOpenForm(true)
  }

  const updateTitleActivity = async () => {
    const data = await Activity.update(params.id, { title: activityTitle })
    setActivityTitle(data.title)
    setEditActivityTitle(false)
  }

  return <>
    <div className="flex items-center justify-between py-10">
      <div className="flex items-center gap-3">
        <BackButton />
        {!editActivityTitle
          ? <PageTitle onClick={() => setEditActivityTitle(true)} dataCy="todo-title">
            {activityTitle}
          </PageTitle>
          : <input
            onBlur={updateTitleActivity}
            onInput={(e) => setActivityTitle(e.target.value)}
            type="text"
            autoFocus
            className="text-4xl font-bold bg-transparent focus:outline-none focus:border-b-2 border-black"
            value={activityTitle}
          />
        }
        <button onClick={editActivityTitle ? updateTitleActivity : () => setEditActivityTitle(true)} data-cy="todo-title-edit-button">
          <div className="todo-edit-title" />
        </button>
      </div>
      <div className="flex items-center gap-5">
        <Suspense fallback={<div></div>}>
          <TodoSorter selected={sortType} getValue={changeSortBy} />
          <AddButton onClick={() => setOpenForm(true)} dataCy="todo-add-button" />
        </Suspense>
      </div>
    </div>
    {
      todos.length
        ? <div>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEditTodo}
              onDelete={openDeleteModal}
              onChangeIsActive={() =>
                handleChangeIsActive(todo.id, { is_active: !todo.is_active })
              }
            />
          ))}
        </div>
        : <Suspense fallback={<div></div>}><TodoEmptyState /></Suspense>
    }

    <Form
      isOpen={openForm}
      editedTodo={editedTodo}
      onClose={() => setOpenForm(false)}
      onSubmitTodo={submitTodo}
    />

    {
      !!deleteTodoData &&
      <DeleteActivity
        data={deleteTodoData}
        onClose={() => setDeleteTodoData(null)}
        handleDelete={handleDeleteTodo}
      />
    }

    <AlertActivity
      message={AlertActivityMessage}
      onClose={() => setAlertActivityMessage('')}
    />
  </>
}

export default DetailItem