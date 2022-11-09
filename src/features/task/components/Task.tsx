import React, { FC, useState } from 'react'
import { ITask } from '../types'
import { PauseIcon, PencilIcon } from '@heroicons/react/solid'
import { InputFiled } from '../../../components/Form/InputFiled'

interface Props {
    task: ITask
    setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>
}

export const Task:FC<Props> = ({task}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [taskTitle, setTaskTitle] = useState(task.title)

    return (
        <li className="flex items-center p-2 mb-2 rounded">
            {isEditing ? 
            <>
                <input 
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                value={taskTitle}
                />
            </> :
            <p>{taskTitle}</p>
            }
            <div onClick={() => setIsEditing(true)} className='p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full'>
                <PencilIcon />
            </div>
            {
                isEditing && 
                <div onClick={() => setIsEditing(false)} className='p-2 w-12 hover:bg-indigo-50 cursor-pointer rounded-full'>
                    <PauseIcon />
                </div>
            }
        </li>
    )
}
