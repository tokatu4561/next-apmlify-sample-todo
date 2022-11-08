import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'
import { MainLayout } from '../src/components/Layout/MainLayout'

type Props = { timestamp: number }

export default function ISR(props: Props) {
  // const [authState, setAuthState] = React.useState();
  // const [user, setUser] = React.useState();

  // React.useEffect(() => {
  //     return onAuthUIStateChange((nextAuthState, authData) => {
  //         setAuthState(nextAuthState);
  //         setUser(authData)
  //     });
  // }, []);

  // AuthState.SignedIn && user ? (
  //   <div className="App">
  //       <div>Hello, {user.username}</div>
  //       <AmplifySignOut />
  //   </div>

  return (
    <MainLayout title="isr">
      <main className={styles.main}>
        <h1 className={styles.title}>ISRページ</h1>
        <p> time: {props.timestamp}</p>
      </main>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  return {
    props: {
      timestamp: new Date().getTime(),
    },
    revalidate: 5, //5秒キャッシュ
  }
}