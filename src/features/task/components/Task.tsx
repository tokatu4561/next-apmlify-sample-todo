import React, { FC, useState } from 'react'
import { ITask } from '../types'
import {
  PauseIcon,
  PencilIcon,
  ArrowCircleUpIcon,
} from '@heroicons/react/solid'
import { API } from 'aws-amplify'

interface Props {
  task: ITask
  setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>
}

export const Task: FC<Props> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [taskTitle, setTaskTitle] = useState(task.title)

  const handleUpdateTask = async () => {
    const taskData = {
      userId: 1,
      title: taskTitle,
    }

    const { task: updatedTask } = await API.put('dev', '/task', {
      headers: {
        ContentType: 'application/json',
      },
      body: {
        task: taskData,
      },
    })

    // setTaskList(prevTasks => {
    //   return [
    //     ...prevTasks,
    //     newTask
    //   ]
    // })
  }

  return (
    <li className="flex items-center p-2 mb-2 rounded">
      {isEditing ? (
        <>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            value={taskTitle}
          />
        </>
      ) : (
        <p>{taskTitle}</p>
      )}

      {isEditing ? (
        <>
          <div
            onClick={() => setIsEditing(false)}
            className="p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full"
          >
            <ArrowCircleUpIcon />
          </div>
          <div
            onClick={() => setIsEditing(false)}
            className="p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full"
          >
            <PauseIcon />
          </div>
        </>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full"
        >
          <PencilIcon />
        </div>
      )}
    </li>
  )
}
