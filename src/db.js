
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgi9UF2VUpJaFpwPxpjR1IEePF8HmFg7g",
  authDomain: "mtm6404-contact-book-rea-8f170.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-8f170",
  storageBucket: "mtm6404-contact-book-rea-8f170.firebasestorage.app",
  messagingSenderId: "172381130341",
  appId: "1:172381130341:web:b342a707a48ccc50e8808c",
  measurementId: "G-PGXQDS5DMZ"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);