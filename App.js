import * as React from 'react'

import Firebase, { FirebaseProvider } from './config/Firebase'

import { AppContainer } from './components';
import MainApp from './navigation'

export default () => {
  return (
    <FirebaseProvider value={Firebase}>
      <MainApp />
    </FirebaseProvider>
  )
}