import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Initialize Firebase only once
const initializeFirebase = () => {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    // Validate required environment variables
    const requiredEnvVars = [
      'FIREBASE_PROJECT_ID',
      'FIREBASE_CLIENT_EMAIL',
      'FIREBASE_PRIVATE_KEY',
      'FIREBASE_BUCKET'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    // Create service account object from environment variables
    const serviceAccount = {
      type: "service_account",
      projectId: process.env.FIREBASE_PROJECT_ID!,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID || "",
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      clientId: process.env.FIREBASE_CLIENT_ID || "",
      authUri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
      tokenUri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
      clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL || `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
      universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN || "googleapis.com"
    };

    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.FIREBASE_BUCKET!,
    });

    console.log('Firebase Admin SDK initialized successfully');
  }
};

// Initialize Firebase when this module is imported
initializeFirebase();

// Export a function to get the storage bucket
export const getFirebaseStorage = () => {
  return getStorage().bucket();
};

// import { initializeApp, cert, getApps } from "firebase-admin/app";
// import { getStorage } from "firebase-admin/storage";
// import { readFileSync } from "fs";

// // Initialize Firebase only once
// const initializeFirebase = () => {
//   // Check if Firebase is already initialized
//   if (getApps().length === 0) {
//     const keyPath = process.env.FIREBASE_ADMIN_CREDENTIALS_PATH!;
//     const keyJson = JSON.parse(readFileSync(keyPath, "utf-8"));

//     initializeApp({
//       credential: cert(keyJson),
//       storageBucket: process.env.FIREBASE_BUCKET,
//     });
//   }
// };

// // Initialize Firebase when this module is imported
// initializeFirebase();

// // Export a function to get the storage bucket
// export const getFirebaseStorage = () => {
//   return getStorage().bucket();
// };

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