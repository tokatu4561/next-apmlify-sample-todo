import React, { FC, useState } from 'react'
import { ITask } from '../types'
import {
  PauseIcon,
  PencilIcon,
  ArrowCircleUpIcon,
} from '@heroicons/react/solid'
import { API } from 'aws-amplify'
import { TaskList } from './TaskList'

interface Props {
  task: ITask
  setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>
}

export const Task: FC<Props> = ({ task, setTaskList }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [taskTitle, setTaskTitle] = useState(task.title)

  const handleUpdateTask = async () => {
    const taskData = {
      id: task.id,
      userId: 1,
      title: taskTitle,
    }

    await API.put('dev', '/task', {
      headers: {
        ContentType: 'application/json',
      },
      body: {
        task: taskData,
      },
    })

    setTaskList((prevTasks) => {
      const updateTask = prevTasks.map((t) => {
        if (t.id !== task.id) return t
        return {
          ...t,
          ...taskData,
        }
      })
      return updateTask
    })
  }

  return (
    <li className="flex items-center p-2 mb-2 rounded">
      <div className="flex-1">
        {isEditing ? (
          <input
            className="flex-1 shadow border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
          />
        ) : (
          <div>
            <p>{taskTitle}</p>
            <span>{task.created_at}</span>
          </div>
        )}
      </div>

      {isEditing ? (
        <>
          <div
            onClick={handleUpdateTask}
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
