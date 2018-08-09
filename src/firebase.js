import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCF1bc6BY3YeqkSDmqo-APRoy8NLKoryvM",
  authDomain: "gryst-fc405.firebaseapp.com",
  databaseURL: "https://gryst-fc405.firebaseio.com",
  projectId: "gryst-fc405",
  storageBucket: "gryst-fc405.appspot.com",
  messagingSenderId: "84717512484"
});

export const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

export default db;