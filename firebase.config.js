// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcmJTFGouvP-hJT3E1ckCWWRh9no90gas",
  authDomain: "open-formiz.firebaseapp.com",
  projectId: "open-formiz",
  storageBucket: "open-formiz.appspot.com",
  messagingSenderId: "45841718621",
  appId: "1:45841718621:web:bbabd1bc4bce4525751cb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
