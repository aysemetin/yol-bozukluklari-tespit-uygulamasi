import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCijHqbHUnTf1P4XSwTCGSci7ML9ZNbiGo",
  authDomain: "yol-bozukluklari.firebaseapp.com",
  projectId: "yol-bozukluklari",
  storageBucket: "yol-bozukluklari.appspot.com",
  messagingSenderId: "175048069883",
  appId: "1:175048069883:web:94d9057056bfaba387965e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export const storage = getStorage(app);