// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "./@firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCwO95Lr0R0S6UDSJC3g871IL7CW8oppCk",
    authDomain: "clone-69841.firebaseapp.com",
    projectId: "clone-69841",
    storageBucket: "clone-69841.appspot.com",
    messagingSenderId: "227691697834",
    appId: "1:227691697834:web:4a78e21d615dcbb00d22d3",
    measurementId: "G-2RY7QFPKSX"
  };

  const firebaseApp =  firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();

  export {db , auth};console.log("hlello");