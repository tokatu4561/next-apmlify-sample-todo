import { atom } from 'recoil'
import { ITask } from '../../features/task/types'

export const todoListState = atom<ITask[]>({
  key: 'todoList',
  default: [],
})
