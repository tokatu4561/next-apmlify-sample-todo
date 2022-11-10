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
        className="mb-2 flex items-center"
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
        <Button type="submit">Add</Button>
      </form>
      <ul>
        {taskList.map((task: ITask, i: number) => {
          return <Task task={task} key={task.id} setTaskList={setTaskList} />
        })}
      </ul>
    </>
  )
}
