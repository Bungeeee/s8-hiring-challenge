import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBMb2PCx4dYMrYhM9Ot9vRj8nTl-3iv6IY",
  authDomain: "sean-s8-hiring-challenge.firebaseapp.com",
  projectId: "sean-s8-hiring-challenge",
  storageBucket: "sean-s8-hiring-challenge.appspot.com",
  messagingSenderId: "154423768390",
  appId: "1:154423768390:web:1412307cf40e77ca242147",
  measurementId: "G-3E0R9F5P0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
export default app