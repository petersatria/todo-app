import { lazy, Suspense, useEffect, useState } from "react"
import useActivity from "../services/useActivity"

import DeleteActivity from "../components/DeleteActivity"
import AlertActivity from "../components/AlertActivity"
import Card from "../components/Card"
import AddButton from "../components/AddButton"

const ActivityEmptyState = lazy(() => import("../components/ActivityEmptyState"))

function Home() {
  const [activity, setActivity] = useState([])
  const [deleteActivityData, setDeleteActivityData] = useState(null)
  const [AlertActivityMessage, setAlertActivityMessage] = useState(null)
  const Activity = useActivity()

  useEffect(async () => {
    await getActivity()
    return () => setActivity([])
  }, [])

  const getActivity = async () => {
    const data = await Activity.get()
    setActivity(data.data)
  }

  const createActivity = async () => {
    await Activity.create({ title: 'New Activity', email: 'cahyaspeter@gmail.com' })
    getActivity()
  }

  const openDeleteModal = (e, ac) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteActivityData(ac)
  }

  const handleDeleteActivity = async () => {
    await Activity.remove(deleteActivityData.id)
    const newAc = activity.filter(ac => ac.id !== deleteActivityData.id)
    setActivity(newAc)
    setDeleteActivityData(null)
    setAlertActivityMessage('Activity berhasil dihapus')
  }

  return <>
    <div className="flex items-center justify-between py-10">
      <h1 className="text-4xl font-bold" data-cy="activity-title">
        Activity
      </h1>
      <Suspense fallback={<div></div>}>
        <AddButton onClick={createActivity} dataCy="activity-add-button" />
      </Suspense>
    </div>
    {
      activity.length
        ? <div className="grid gap-5 pb-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {activity.map((ac, index) => (
            <Card
              key={ac.id}
              index={index}
              onDelete={(e) => openDeleteModal(e, ac)}
              {...ac}
            />
          ))}
        </div>
        : <Suspense fallback={<div></div>}><ActivityEmptyState /></Suspense>
    }

    {
      deleteActivityData &&
      <DeleteActivity
        data={deleteActivityData}
        onClose={() => setDeleteActivityData(null)}
        handleDelete={handleDeleteActivity}
      />
    }

    <AlertActivity
      message={AlertActivityMessage}
      onClose={() => setAlertActivityMessage('')}
    />
  </>
}

export default Home