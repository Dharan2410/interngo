




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCPH_x_LghBNmBlOCI4d0LXh-2hRCroknI",
//   authDomain: "interngo-login-system.firebaseapp.com",
//   projectId: "interngo-login-system",
//   storageBucket: "interngo-login-system.firebasestorage.app",
//   messagingSenderId: "202239296997",
//   appId: "1:202239296997:web:aad89f9ebc7c940cde9b0c",
//   measurementId: "G-RE1GJ1CE8C"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPH_x_LghBNmBlOCI4d0LXh-2hRCroknI",
  authDomain: "interngo-login-system.firebaseapp.com",
  projectId: "interngo-login-system",
  storageBucket: "interngo-login-system.firebasestorage.app",
  messagingSenderId: "202239296997",
  appId: "1:202239296997:web:aad89f9ebc7c940cde9b0c",
  measurementId: "G-RE1GJ1CE8C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
