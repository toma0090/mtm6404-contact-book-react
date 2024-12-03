import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA7jSKJE4Bv4-ScmtXnIkzvCwWaO0ETY",
  authDomain: "mtm6404-contact-book-rea-9efe.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-9efe",
  storageBucket: "mtm6404-contact-book-rea-9efe.appspot.com",
  messagingSenderId: "93217183948",
  appId: "1:93217183948:web:35d86819cd5540aaa8ca69",
  measurementId: "G-C335T840KP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
