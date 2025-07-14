
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { readFileSync } from "fs";

// Initialize Firebase only once
const initializeFirebase = () => {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    const keyPath = process.env.FIREBASE_ADMIN_CREDENTIALS_PATH!;
    const keyJson = JSON.parse(readFileSync(keyPath, "utf-8"));

    initializeApp({
      credential: cert(keyJson),
      storageBucket: process.env.FIREBASE_BUCKET,
    });
  }
};

// Initialize Firebase when this module is imported
initializeFirebase();

// Export a function to get the storage bucket
export const getFirebaseStorage = () => {
  return getStorage().bucket();
};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC8ppKqetgDzeh572LuhzPmUaJDFZPKFl4",
//   authDomain: "blog-image-40829.firebaseapp.com",
//   projectId: "blog-image-40829",
//   storageBucket: "blog-image-40829.appspot.com",
//   messagingSenderId: "293002530241",
//   appId: "1:293002530241:web:02d4b8cb41d45de8a2f340",
//   measurementId: "G-SHE9TGM05Q"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);