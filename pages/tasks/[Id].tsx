import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MainLayout } from '../../src/components/Layout/MainLayout'
import { API } from 'aws-amplify'
import { ITask } from '../../src/features/task/types'
import { ParsedUrlQuery } from 'querystring'
import { Button } from '../../src/components/Button'
import { TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface TaskPageParams extends ParsedUrlQuery {
  id: string
}

interface TaskDetailPageProps {
  task: ITask
}

const TaskDetailPage: NextPage<TaskDetailPageProps> = ({ task }) => {
  const router = useRouter()
  const handleDeleteTask = async () => {
    try {
      await API.del('amplify-testing', '/task', {
        headers: {
          ContentType: 'application/json',
        },
        body: {
          task: {
            id: task.id,
            user_id: task.user_id,
            title: task.title,
          },
        },
      })
      router.push('/tasks')
    } catch (error) {
      alert('failed delete')
    }
  }
  return (
    <MainLayout title={`task detail ${task.title}`}>
      <main className="flex justify-center items-center text-gray-600">
        <div className="w-2/4 py-6 font-bold">
          <h1 className="text-2xl font-bold text-center mb-12">ISRしてます</h1>
          <p>ID: {task.id}</p>
          <p>Title: {task.title}</p>
          <p>UserId: {task.user_id}</p>
          <p>CreatedAt:{task.created_at}</p>
          <p>UpdatedAt:{task.updated_at}</p>

          <Button
            onClick={handleDeleteTask}
            type="button"
            className="bg-red-400 hover:bg-red-700"
          >
            Delete
            <TrashIcon />
          </Button>
        </div>
        <Link href="/tasks" passHref>
          <Button type="button">Back</Button>
        </Link>
      </main>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps<
  TaskDetailPageProps,
  TaskPageParams
> = async (context) => {
  const id = context.params?.Id

  try {
    const response = await API.get('amplify-testing', `/tasks/${id}`, {})
    const task = response.task

    return {
      props: {
        task: task,
      },
      revalidate: 60,
    }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}

export default TaskDetailPage
