import { API } from 'aws-amplify'

import React, { FC, useState } from 'react'
import { ITask } from '../types'
import CreateTaskForm, { CreateTaskInputs } from './CreateTaskForm'
import { TaskTableRow } from './TaskTableRow'

interface Props {
  fetchedTaskList: ITask[]
}

export const TaskList: FC<Props> = ({ fetchedTaskList = [] }) => {
  const [taskList, setTaskList] = useState<ITask[]>(fetchedTaskList)

  const onSubmit = async (data: CreateTaskInputs) => {
    const { taskTitle } = data
    const taskData = {
      userId: 1,
      title: taskTitle,
    }

    const { task: newTask } = await API.post('dev', '/task', {
      headers: {
        ContentType: 'application/json',
      },
      body: {
        task: taskData,
      },
    })

    setTaskList((prevTasks) => {
      return [...prevTasks, newTask]
    })
  }

  return (
    <>
      <CreateTaskForm onSubmit={onSubmit} />

      <h2 className="text-2xl mb-4">TaskList</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500">
              Title
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500">
              CreatedAt
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500">
              Edit
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task: ITask, i: number) => (
            <TaskTableRow task={task} setTaskList={setTaskList} key={task.id} />
          ))}
        </tbody>
      </table>
    </>
  )
}
