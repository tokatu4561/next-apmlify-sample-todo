import { GetServerSideProps, GetStaticProps } from 'next'
import { Amplify, withSSRContext } from 'aws-amplify'
import { MainLayout } from '../../src/components/Layout/MainLayout'
import { ITask } from '../../src/features/task/types'
import { TaskList } from '../../src/features/task/components/TaskList'

type Props = { tasks: ITask[] }

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'amplify-testing',
        endpoint:
          'https://2shf04a5z7.execute-api.ap-northeast-1.amazonaws.com/Prod',
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
