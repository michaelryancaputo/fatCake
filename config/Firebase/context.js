import React from 'react'

const FirebaseContext = React.createContext({})

export const FirebaseProvider = FirebaseContext.Provider
export const FirebaseConsumer = FirebaseContext.Consumer

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
)
