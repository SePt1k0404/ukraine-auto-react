// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjXGK7cLrEiHlmvtO3rxSJ2mKapV2RHwI",
  authDomain: "ukraine-auto-react.firebaseapp.com",
  projectId: "ukraine-auto-react",
  storageBucket: "ukraine-auto-react.firebasestorage.app",
  messagingSenderId: "492770810033",
  appId: "1:492770810033:web:d7504105f37b743b30aa90",
  measurementId: "G-2CESSYB3M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);