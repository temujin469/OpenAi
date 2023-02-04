import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMZWrfh7wzFjvvnuhTVrmPnowd_qYo9AM",
  authDomain: "chat-app-1-53aac.firebaseapp.com",
  projectId: "chat-app-1-53aac",
  storageBucket: "chat-app-1-53aac.appspot.com",
  messagingSenderId: "992439471087",
  appId: "1:992439471087:web:9c3cca6de23f07f8df041a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();
