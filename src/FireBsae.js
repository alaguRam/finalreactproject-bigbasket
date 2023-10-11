// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC08F06JkKASyhQmpjj6asWY0-CRrdIxT8",
  authDomain: "otp-login-bigbasket.firebaseapp.com",
  projectId: "otp-login-bigbasket",
  storageBucket: "otp-login-bigbasket.appspot.com",
  messagingSenderId: "490828597442",
  appId: "1:490828597442:web:6a21f514378e2e3380d35b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);