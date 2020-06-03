import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCt3IJPhAIUAYHjtqcav1EBa09Tq-N87_o",
  authDomain: "dodone-ae3d0.firebaseapp.com",
  databaseURL: "https://dodone-ae3d0.firebaseio.com",
  projectId: "dodone-ae3d0",
  storageBucket: "dodone-ae3d0.appspot.com",
  messagingSenderId: "451148905723",
  appId: "1:451148905723:web:e829dfb044f34768c4c45e",
});

export { firebaseConfig as firebase };
