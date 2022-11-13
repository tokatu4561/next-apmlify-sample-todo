import type { NextPage } from 'next'
import Link from 'next/link'
import { MainLayout } from '../src/components/Layout/MainLayout'

const Home: NextPage = () => {
  return (
    <MainLayout title="ホーム">
      <main className="flex justify-center items-center text-gray-600 h-screen">
        <div className="flex flex-col space-y-8">
          <Link href={'/isr'}>
            <a className="text-2xl font-bold hover:underline">
              isr動作確認ページへ
            </a>
          </Link>
          <Link href={'/tasks'}>
            <a className="text-2xl font-bold hover:underline">
              TaskListページへ（SSR）
            </a>
          </Link>
          <a
            href="https://github.com/tokatu4561/next-apmlify-sample-todo"
            className="text-2xl font-bold hover:underline"
          >
            {'Code(front)'}
          </a>
          <a
            href="https://github.com/tokatu4561/lambda-memo-api"
            className="text-2xl font-bold hover:underline"
          >
            {'Code(api)'}
          </a>
        </div>
      </main>
    </MainLayout>
  )
}

export default Home
