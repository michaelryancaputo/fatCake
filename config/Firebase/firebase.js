import 'firebase/auth'
import 'firebase/firestore'

import * as firebase from 'firebase'

import firebaseConfig from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Auth = firebase.auth();

const Firebase = {
  general: () => {
    console.log(Auth);
  },
  // auth
  loginWithEmail: (email, password) => {
    return Auth.signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return Auth.createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return Auth.signOut()
  },
  checkUserAuth: user => {
    return Auth.onAuthStateChanged(user)
  },
  passwordReset: email => {
    return Auth.sendPasswordResetEmail(email);
  },
  getCurrenUser: () => {
    return Auth.currentUser;
  },

  updateUser: (options) => {
    return Auth.currentUser.updateProfile(options);
  },

  deleteUser: () => {
    return Auth.currentUser.delete()
  },

  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  },

}

export default Firebase;
