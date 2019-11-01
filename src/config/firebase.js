// import * as firebase from "firebase";

// import { FirebaseConfig } from "./keys";
// firebase.initializeApp(FirebaseConfig);

// export const databaseRef = firebase.database().ref();


const config = {
  apiKey: "AIzaSyCZDp4qyvohNuwbutufxNDQjDFYN2P2Q84",
  authDomain: "tektrak-4d859.firebaseapp.com",
  databaseURL: "https://tektrak-4d859.firebaseio.com",
  projectId: "tektrak-4d859",
  storageBucket: "tektrak-4d859.appspot.com",
  messagingSenderId: "186397264830"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);

export default firebase;

export {
  firestore,
  fbApp
};