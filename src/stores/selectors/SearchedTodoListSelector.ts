import { selector } from 'recoil'
import { ITask } from '../../features/task/types'
import { todoListState } from '../atoms/todoListAtom'
import { searchTextFormState } from '../atoms/todoTitleFormAtom'

export const searchedTodoListSelector = selector<ITask[]>({
  key: 'searchedTodoListSelector',
  get: ({ get }) => {
    const todoList: ITask[] = get(todoListState)

    const searchText: string = get(searchTextFormState)

    return searchText
      ? todoList.filter((t) => t.title.includes(searchText))
      : todoList
  },
})
