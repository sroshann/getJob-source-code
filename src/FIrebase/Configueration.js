// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCKTuTKftiYwYiK8UlAdPTgxjk9k2rHZrs",
  authDomain: "getjob-84bbb.firebaseapp.com",
  projectId: "getjob-84bbb",
  storageBucket: "getjob-84bbb.appspot.com",
  messagingSenderId: "409450140110",
  appId: "1:409450140110:web:07965b057ba7f42d8c5b9f"

};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth( FirebaseApp )
const FirebaseFirestore = getFirestore( FirebaseApp )
const FirebaseStorage = getStorage( FirebaseApp )

export { FirebaseApp , FirebaseAuth , FirebaseFirestore , FirebaseStorage }