import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDLHI-qWsgV7U4JKOyzgNEpEcYfqDT3FHw',
  authDomain: 'cocktailapp-40264.firebaseapp.com',
  projectId: 'cocktailapp-40264',
  storageBucket: 'cocktailapp-40264.appspot.com',
  messagingSenderId: '886927843585',
  appId: '1:886927843585:web:b18fd505969398204abb00',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
