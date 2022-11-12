import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../../components/Button'
import { InputFiled } from '../../../components/Form/InputFiled'

interface Props {
  onSubmit: (data: CreateTaskInputs) => Promise<void>
}

export type CreateTaskInputs = {
  taskTitle: string
}

const CreateTaskForm: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskInputs>({
    mode: 'onChange',
  })

  return (
    <form
      className="flex items-center flex-col"
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

      <Button type="submit" className="mt-2">
        Create
      </Button>
    </form>
  )
}

export default CreateTaskForm
