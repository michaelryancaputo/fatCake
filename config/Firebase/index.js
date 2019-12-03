import 'firebase/auth';
import 'firebase/firestore';

import * as firebase from 'firebase';

import { getUserInfo, reduceImageAsync, uploadPhoto } from '../../utils';

import firebaseConfig from './firebaseConfig';
import uuid from 'uuid';

const collectionName = 'event-photos';

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    // // Listen for auth
    // firebase.auth().onAuthStateChanged(async user => {
    //   if (!user) {
    //     await firebase.auth().signInAnonymously();
    //   }
    // });
  }

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    console.log(`uploadPhotoAsync ${uri} ${path}`);
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    console.log('before try')
    try {
      console.log('before reduceImageAsync')
      const { uri: reducedImage, width, height } = await reduceImageAsync(
        localUri,
      );

      console.log('after reduceImageAsync')
      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      console.log(remoteUri)
      this.collection.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user: getUserInfo(),
      });
    } catch ({ message }) {
      console.error(`error ${message}`);
      alert(message);
    }
  };

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }

  general() {
    console.log(firebase.auth());
  }

  // auth
  loginWithEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
  signupWithEmail(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }
  signOut() {
    return firebase.auth().signOut()
  }
  checkUserAuth(user) {
    return firebase.auth().onAuthStateChanged(user)
  }
  passwordReset(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  updateUser(options) {
    return firebase.auth().currentUser.updateProfile(options);
  }

  deleteUser() {
    return firebase.auth().currentUser.delete()
  }

  createNewUser(userData) {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  }
}

Fire.shared = new Fire();

export default Fire;
