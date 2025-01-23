// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdtS_QElOUhzQcMsisl6WqRCo7kK4DlEw",
  authDomain: "expense-tracker-gql.firebaseapp.com",
  projectId: "expense-tracker-gql",
  storageBucket: "expense-tracker-gql.firebasestorage.app",
  messagingSenderId: "574310733278",
  appId: "1:574310733278:web:3737ab2ddf212a62ca394f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 