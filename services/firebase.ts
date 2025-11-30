import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Priority: Environment Variables -> Hardcoded Fallback (for preview/dev)
const env = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyAHOqwOm-lmrs5lAdUOi70QN5fjY3_eXg8",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "twochatapp-c9bd2.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "twochatapp-c9bd2",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "twochatapp-c9bd2.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "757482452934",
  appId: env.VITE_FIREBASE_APP_ID || "1:757482452934:web:4f8c2a6b7713637d2fa4c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);