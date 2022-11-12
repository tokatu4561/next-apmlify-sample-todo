import { API } from 'aws-amplify'
import { time } from 'console'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../../components/Button'
import { InputFiled } from '../../../components/Form/InputFiled'
import { ITask } from '../types'
import { Task } from './Task'

interface Props {
  fetchedTaskList: ITask[]
}

type Inputs = {
  taskTitle: string
}

export const TaskList: FC<Props> = ({ fetchedTaskList = [] }) => {
  const [taskList, setTaskList] = useState<ITask[]>(fetchedTaskList)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  })

  const onSubmit = async (data: any) => {
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
      <form
        className="mb-2 flex items-center flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFiled
          inputId="add-todo"
          label="Add task"
          type="text"
          placeholder="テスト"
          {...register('taskTitle', { required: true })}
        />
        {errors.taskTitle && (
          <span className="text-red-500">入力は必須です。</span>
        )}
        <Button type="submit">Create</Button>
      </form>

      <h2 className="mb-4">TaskList</h2>

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
            <Task task={task} setTaskList={setTaskList} key={task.id} />
          ))}
        </tbody>
      </table>
    </>
  )
}
