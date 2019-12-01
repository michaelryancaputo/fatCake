import Firebase, { FirebaseProvider } from './config/Firebase'

import { AppContainer } from './components';
import MainApp from './navigation'
import React from 'react'

export default () => {
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer>
        <MainApp />
      </AppContainer>
    </FirebaseProvider>
  )
}