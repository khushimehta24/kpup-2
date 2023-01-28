
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCUzfDaR6RiqtCIn3Ts_8CWlvkLbx2wvcY",
    authDomain: "k-pup-45e93.firebaseapp.com",
    projectId: "k-pup-45e93",
    storageBucket: "k-pup-45e93.appspot.com",
    messagingSenderId: "668247895040",
    appId: "1:668247895040:web:c597058b1642e4e4a87ce5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)