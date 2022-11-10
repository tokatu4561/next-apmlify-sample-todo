import type { AppProps } from 'next/app'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '../styles/globals.css'
import awsconfig from '../src/aws-exports'

Amplify.configure(awsconfig)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator signUpAttributes={['email']}>
      <Component {...pageProps} />
    </Authenticator>
  )
}

export default MyApp
