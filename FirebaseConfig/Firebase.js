// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKtF9k2MPC6vr4lm5QIb1HX63nGkohins",
  authDomain: "res4udb.firebaseapp.com",
  projectId: "res4udb",
  storageBucket: "res4udb.appspot.com",
  messagingSenderId: "295389565848",
  appId: "1:295389565848:web:68c99257f076d3ac7a91ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);