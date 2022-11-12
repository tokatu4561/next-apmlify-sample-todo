import React, { FC, useState } from 'react'
import { ITask } from '../types'
import {
  PauseIcon,
  PencilIcon,
  ArrowCircleUpIcon,
  ArrowRightIcon,
} from '@heroicons/react/solid'
import { API } from 'aws-amplify'
import Link from 'next/link'
import { dateFormat } from '../../../lib/utils'

interface Props {
  task: ITask
  setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>
}

export const TaskTableRow: FC<Props> = ({ task, setTaskList }) => {
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
    <tr
      className="p-2 mb-2 rounded odd:bg-white even:bg-gray-100"
      key={task.id}
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
        {isEditing ? (
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
          />
        ) : (
          <p>{taskTitle}</p>
        )}
      </td>

      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
        {dateFormat(task.created_at)}
      </td>

      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
        <div className="flex">
          {isEditing ? (
            <>
              <div
                onClick={() => setIsEditing(false)}
                className="p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full"
              >
                <PauseIcon />
              </div>
              <div
                onClick={handleUpdateTask}
                className="p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full"
              >
                <ArrowCircleUpIcon />
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setIsEditing(true)}
                className="p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full"
              >
                <PencilIcon />
              </div>
            </>
          )}
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
        <div className="flex">
          <Link passHref href={`tasks/${task.id}`}>
            <a className="p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full">
              <ArrowRightIcon />
            </a>
          </Link>
        </div>
      </td>
    </tr>
  )
}
