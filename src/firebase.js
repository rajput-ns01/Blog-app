import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyACtDhDduGSvYyyt461w1rhqbuG2tv4vt4",
  authDomain: "home-5aef3.firebaseapp.com",
  databaseURL: "https://home-5aef3-default-rtdb.firebaseio.com",
  projectId: "home-5aef3",
  storageBucket: "home-5aef3.appspot.com",
  messagingSenderId: "58942142527",
  appId: "1:58942142527:web:4557a8fc03db9f428ee08a"
};

export const app = initializeApp(firebaseConfig);