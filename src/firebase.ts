// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgY4sJ-0fI_v8fjQMD1NDhsjPAuIfHQlw",
  authDomain: "test-signup-2054a.firebaseapp.com",
  projectId: "test-signup-2054a",
  storageBucket: "test-signup-2054a.firebasestorage.app",
  messagingSenderId: "318395312720",
  appId: "1:318395312720:web:efb67c4f2caa3def683f55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);