import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { GetServerSideProps, GetStaticProps } from 'next'
import { Amplify, withSSRContext } from 'aws-amplify'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import { MainLayout } from '../../src/components/Layout/MainLayout'

interface ITask {
    id: string
    userId: number
    title: string
    createdAt: string
    updatedAt: string
}

type Props = { tasks: ITask[] }

Amplify.configure({
    API: {
      endpoints: [
        {
          name: 'dev',
          endpoint:
            'http://127.0.0.1:9000',
        },
      ],
    },
  });

export default function Tasks(props: Props) {
  const {tasks} = props

  return (
      <MainLayout title='タスク一覧'>
        <h1>SSRページ</h1>
        {
            tasks.map(task => (
                <p>{task.id}: {task.title} : {task.createdAt}</p>
            ))
        }
      </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
    const { API } = withSSRContext(context);

    let tasks = []
    try {
       const response = await API.get('dev', '/tasks');
       tasks = response.tasks
    } catch (err) {
        console.log('error fetching', err);
    }

  return {
    props: {
        tasks: tasks
    },
  }
}