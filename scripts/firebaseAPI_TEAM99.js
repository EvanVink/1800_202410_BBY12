//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDL7dJYa3STvWHdN_9PRSPwed8W2r9OnHk",
    authDomain: "fir-8aefb.firebaseapp.com",
    projectId: "fir-8aefb",
    storageBucket: "fir-8aefb.appspot.com",
    messagingSenderId: "509307017348",
    appId: "1:509307017348:web:8f4f57d1c3b061738acad1",
    measurementId: "G-0FY8RSRVQQ"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
