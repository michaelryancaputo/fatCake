import 'firebase/auth';
import 'firebase/firestore';

import * as firebase from 'firebase';

import { reduceImageAsync, uploadPhoto } from '../../utils';

import { GeoFirestore } from 'geofirestore';
import _ from 'lodash';
import firebaseConfig from '../firebaseConfig';
import uuid from 'uuid';

export const userCollectionName = 'users';
export const eventCollectionName = 'event-photos';
export const profileCollectionName = 'profile-photos';
export const locationCollectionName = 'locations';

const PROXIMITY_IN_KM = 0.02;

class Fire {
  constructor() {
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
  }

  // Download Data
  getPaged = async (collectionName, { size, start }, self = false) => {
    let ref = this[ collectionName ].orderBy("timestamp", "desc").limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      if (self) {
        console.error(
          "this is where we would modify the query to get images uploaded by self"
        );
      }

      const querySnapshot = await ref.get();
      const data = [];

      querySnapshot.forEach(doc => {
        if (doc.exists) {
          const post = doc.data() || {};
          const reduced = {
            key: doc.id,
            ...post
          };

          data.push(reduced);
        }
      });

      const cursor = querySnapshot.docs[ querySnapshot.docs.length - 1 ];
      return { data, cursor };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async (uri, collectionName) =>
    uploadPhoto(uri, `${collectionName}/${this.uid}/${uuid.v4()}.jpg`);

  postUserPhoto = async localUri => {
    try {
      const { uri: reducedImage, width, height } = await reduceImageAsync(
        localUri
      );

      const photoUrl = await this.uploadPhotoAsync(
        reducedImage,
        profileCollectionName
      );

      this.updateUserData({
        photoUrl
      });

      return photoUrl;
    } catch ({ message }) {
      alert(message);
    }
  };

  checkLocationProximity = async ({ coords }) => {
    try {
      const firestore = firebase.firestore();
      const geofirestore = new GeoFirestore(firestore);
      const geocollection = geofirestore.collection(locationCollectionName);
      const ref = await geocollection.near({
        center: new firebase.firestore.GeoPoint(
          coords.latitude,
          coords.longitude
        ),
        radius: PROXIMITY_IN_KM
      });

      const list = await ref.get().then(value => value.docs);
      return _.last(list) || false;
    } catch ({ message }) {
      alert(message);
    }
  };

  postEvent = async ({ text, localUri, location }) => {
    try {
      const { uri: reducedImage, width, height } = await reduceImageAsync(
        localUri
      );

      const proximity = await this.checkLocationProximity(location);
      const image = await this.uploadPhotoAsync(
        reducedImage,
        eventCollectionName
      );
      const user = await this.getCurrentUser();

      this.eventCollection.add({
        text,
        image,
        uid: this.uid,
        imageWidth: width,
        imageHeight: height,
        location: location.coords,
        timestamp: this.timestamp,
        proximity: proximity ? proximity.id : 0,
        user
      });

      return proximity;
    } catch (error) {
      console.log(error);
      alert(error.message);
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

  data(doc) {
    return doc.data();
  }

  general() {
    console.log(firebase.auth());
  }

  // auth
  loginWithEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupWithEmail(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    return firebase.auth().signOut();
  }

  checkUserAuth(user) {
    return firebase.auth().onAuthStateChanged(user);
  }

  passwordReset(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  getCurrentUser = async () =>
    await firebase
      .firestore()
      .collection(userCollectionName)
      .doc(this.uid)
      .get()
      .then(this.data);

  updateUserProfile(options) {
    return firebase.auth().currentUser.updateProfile({
      ...options,
      timestamp: this.timestamp
    });
  }

  updateUserData(options) {
    const filteredOptions = _.omitBy(options, (v) => !v);
    const db = firebase.firestore();

    db.collection('users').where('uid', '==', this.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection('users').doc(doc.id).update(filteredOptions);
        });
      });
  }

  deleteUser() {
    return firebase.auth().currentUser.delete();
  }

  firestore() {
    return firebase.firestore();
  }

  createNewUser(userData) {
    return firebase
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .set({ ...userData, timestamp: this.timestamp });
  }

  getAllDocuments = async collectionName => {
    if (!collectionName) return [];

    let ref = firebase.firestore().collection(collectionName);
    const querySnapshot = await ref.get();
    const data = [];

    querySnapshot.forEach(doc => {
      if (doc.exists) {
        const post = doc.data() || {};
        const reduced = {
          key: doc.id,
          ...post
        };

        data.push(reduced);
      }
    });

    return data;
  };

  addLocation = () => {
    const geofirestore = new GeoFirestore(firebase.firestore());

    // Create a GeoCollection reference
    const geocollection = geofirestore.collection(locationCollectionName);

    // Add a GeoDocument to a GeoCollection
    geocollection.add({
      name: "Ritual Hayes Valley",
      address: "432b Octavia St, San Francisco, CA 94102",
      score: 100,
      coordinates: new firebase.firestore.GeoPoint(37.776420, -122.424226)
    });
  };
}

Fire.shared = new Fire();

export default Fire;
