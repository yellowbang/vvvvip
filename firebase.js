// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqnO2NYGfo8JXWQYFlfZUmKiZo5vP8D98",
  authDomain: "vvvvip-c3fb1.firebaseapp.com",
  projectId: "vvvvip-c3fb1",
  storageBucket: "vvvvip-c3fb1.appspot.com",
  messagingSenderId: "881690805987",
  appId: "1:881690805987:web:7c5e383a117d7776a027d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default app;
export {firestore};