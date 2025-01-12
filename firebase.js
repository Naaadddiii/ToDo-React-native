// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcmUB1gnFt3SHs2PK-bZcgzjqfz0MsLC0",
  authDomain: "todo-efc64.firebaseapp.com",
  projectId: "todo-efc64",
  storageBucket: "todo-efc64.firebasestorage.app",
  messagingSenderId: "410942917182",
  appId: "1:410942917182:web:07eaed3d90ed7d2e3a9f6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
