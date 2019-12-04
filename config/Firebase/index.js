import 'firebase/auth';
import 'firebase/firestore';

import * as firebase from 'firebase';

import { reduceImageAsync, uploadPhoto } from '../../utils';

import firebaseConfig from './firebaseConfig';
import uuid from 'uuid';

const eventCollectionName = 'event-photos';
const profileCollectionName = 'profile-photos';

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  // Download Data
  getPaged = async (collectionName, { size, start }, self = false) => {
    let ref = this[collectionName].orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      if (self) {
        console.error('this is where we would modify the query to get images uploaded by self')
      }

      const querySnapshot = await ref.get();
      const data = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const post = doc.data() || {};
          const reduced = {
            key: doc.id,
            ...post,
          };

          data.push(reduced);
        }
      });

      const cursor = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor };

    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async (uri, collectionName) =>
    uploadPhoto(uri, `${collectionName}/${this.uid}/${uuid.v4()}.jpg`);

  postUserPhoto = async ({ localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await reduceImageAsync(
        localUri,
      );

      const photoUrl = await this.uploadPhotoAsync(reducedImage, profileCollectionName);

      this.updateUser({
        photoUrl: {
          url: photoUrl,
          width,
          height
        },
      });
    } catch ({ message }) {
      alert(message);
    }
  }

  postEvent = async ({ text, localUri, location }) => {
    try {
      const { uri: reducedImage, width, height } = await reduceImageAsync(
        localUri,
      );

      const image = await this.uploadPhotoAsync(reducedImage, eventCollectionName);

      this.eventCollection.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image,
        location: location.coords,
        user: this.getCurrentUser().providerData[0],
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get eventCollection() {
    return firebase.firestore().collection(eventCollectionName);
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
    return firebase.auth().currentUser.updateProfile({
      ...options,
      timestamp: this.timestamp,
    });
  }

  deleteUser() {
    return firebase.auth().currentUser.delete()
  }

  createNewUser(userData) {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set({ ...userData, timestamp: this.timestamp })
  }
}

Fire.shared = new Fire();

export default Fire;
