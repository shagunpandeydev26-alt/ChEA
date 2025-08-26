// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB-WkulptqaiDyf_8hcEzvL3Qsg4cWNwMM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "chea-b071c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "chea-b071c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "chea-b071c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "599306730970",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:599306730970:web:cba850f98f2036ba2154e3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4CJ9P0TT36"
};

console.log('🔥 [Firebase] Initializing with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  apiKeyPresent: !!firebaseConfig.apiKey
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('✅ [Firebase] App initialized successfully');

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log('🔐 [Firebase] Auth initialized');

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);
console.log('📊 [Firebase] Firestore initialized');

// Initialize Analytics (optional)
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('📈 [Firebase] Analytics initialized');
  } catch (error) {
    console.warn('⚠️ [Firebase] Analytics initialization failed:', error);
  }
}

export { analytics };
export default app;