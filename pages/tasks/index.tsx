import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { GetServerSideProps, GetStaticProps } from 'next'
import { Amplify, withSSRContext } from 'aws-amplify'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import { MainLayout } from '../../src/components/Layout/MainLayout'
import { InputFiled } from '../../src/components/Form/InputFiled'
import { ITask } from '../../src/features/task/types'
import { TaskList } from '../../src/features/task/components/TaskList'

type Props = { tasks: ITask[] }

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'dev',
        endpoint: 'http://127.0.0.1:9000',
      },
    ],
  },
})

export default function Tasks(props: Props) {
  const { tasks } = props

  return (
    <MainLayout title="タスク一覧">
      <main className="flex justify-center items-center text-gray-600">
        <div className="w-2/4 py-6">
          <div>
            <h1 className="font-bold text-center mb-12">SSRしてます</h1>
            <TaskList fetchedTaskList={tasks} />
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { API } = withSSRContext(context)

  let tasks = []
  try {
    const response = await API.get('dev', '/tasks')
    tasks = response.tasks
  } catch (err) {
    console.log('error fetching', err)
  }

  return {
    props: {
      tasks: tasks,
    },
  }
}
