// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhFXzy9JV556AdWoI4jb8fWZTuv6nZyKE",
    authDomain: "swpschoolmanagement.firebaseapp.com",
    projectId: "swpschoolmanagement",
    storageBucket: "swpschoolmanagement.appspot.com",
    messagingSenderId: "12539206860",
    appId: "1:12539206860:web:05093149057a7f7f667669"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
