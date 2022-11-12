import styles from '../styles/Home.module.css'
import { MainLayout } from '../src/components/Layout/MainLayout'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { GetStaticProps } from 'next'

type Props = { createdAt: number; nextCreatedAt: string }

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault('Asia/Tokyo')

const intervalSecond = 20
const formatStyle = 'MM/DD HH:mm:ss'

export default function ISR(props: Props) {
  const { createdAt, nextCreatedAt } = props
  return (
    <MainLayout title="isr">
      <main className={styles.main}>
        <h1 className={styles.title}>ISRページ</h1>
        <h2>Interval</h2>
        <h1>{intervalSecond}s</h1>
        <br />
        <h2>Page accessed time</h2>
        <h1>{dayjs().tz().format(formatStyle)}</h1>
        <h2>Next HTML can be generated time</h2>
        <h1>{nextCreatedAt}</h1>
        <h2>HTML created time</h2>
        <h1>{createdAt}</h1>
      </main>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const currentTime = dayjs().tz()
  const createdAt = currentTime.format(formatStyle)
  const nextCreatedAt = currentTime.add(intervalSecond, 's').format(formatStyle)

  return {
    props: {
      createdAt,
      nextCreatedAt,
    },
    revalidate: intervalSecond, //5秒キャッシュ
  }
}
