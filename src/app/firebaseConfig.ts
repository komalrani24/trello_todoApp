// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEX7WlTUaStTbIOom3xsmtsUZST45brQk",
  authDomain: "trello-c36a2.firebaseapp.com",
  projectId: "trello-c36a2",
  storageBucket: "trello-c36a2.appspot.com",
  messagingSenderId: "544204534897",
  appId: "1:544204534897:web:554642ea97015ddfa497d0",
  measurementId: "G-YFWBYWBYVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
