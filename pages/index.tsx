import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MainLayout } from '../src/components/Layout/MainLayout'

const Home: NextPage = () => {
  return (
    <MainLayout title="ホーム">
        <Link href={'/isr'}>
          <a>isr動作確認ページへ</a>
        </Link>     
    </MainLayout>
  )
}

export default Home
