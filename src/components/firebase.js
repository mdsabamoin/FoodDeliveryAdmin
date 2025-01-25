// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCq9nTHRqa26QG8-FwNFlSDBNo4kN5pyk0",
  authDomain: "fooddeliveryapp-406eb.firebaseapp.com",
  projectId: "fooddeliveryapp-406eb",
  storageBucket: "fooddeliveryapp-406eb.appspot.com",
  messagingSenderId: "163801889998",
  appId: "1:163801889998:web:c24f60cfc04ae580a0e49f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp); // Firebase Authentication
const db = getFirestore(firebaseApp); // Firestore Database
const storage = getStorage(firebaseApp); // Firebase Storage

// Export the initialized services
export { firebaseApp, auth, db, storage };
