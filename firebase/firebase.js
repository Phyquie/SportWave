// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sportwave-8d22e.firebaseapp.com",
  projectId: "sportwave-8d22e",
  storageBucket: "sportwave-8d22e.firebasestorage.app",
  messagingSenderId: "629119765771",
  appId: "1:629119765771:web:8daf78086fff643ac6260e",
  measurementId: "G-LF9KGDPSD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };
