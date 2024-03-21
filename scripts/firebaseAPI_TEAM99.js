//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCnd9jkvWAGMEom5lrfV7LycdfNVL9uKeQ",
  authDomain: "crimewatch-fa960.firebaseapp.com",
  projectId: "crimewatch-fa960",
  storageBucket: "crimewatch-fa960.appspot.com",
  messagingSenderId: "71159774002",
  appId: "1:71159774002:web:8b2636e8c981a615b4752b",
  measurementId: "G-FH07RQT6FN"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
