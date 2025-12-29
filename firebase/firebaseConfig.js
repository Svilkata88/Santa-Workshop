// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB14I3tryYSJEp0O4up3aVaOlU7kv0SFY8",
  authDomain: "santas-workshop-5d7ff.firebaseapp.com",
  projectId: "santas-workshop-5d7ff",
  storageBucket: "santas-workshop-5d7ff.firebasestorage.app",
  messagingSenderId: "18486095322",
  appId: "1:18486095322:web:f439a642d051c7ed4924e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const baseUrl = 'https://santas-workshop-5d7ff-default-rtdb.europe-west1.firebasedatabase.app/';