
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// A function to check if all required environment variables are present
const checkFirebaseConfig = (): boolean => {
  const isConfigured = Object.values(firebaseConfig).every(Boolean);
  if (!isConfigured && typeof window !== 'undefined') { // Only log error in the browser
      console.error(
        "🔴 Firebase configuration is missing or incomplete! " +
        "Please ensure all NEXT_PUBLIC_FIREBASE_ environment variables are set in your .env file. " +
        "Firebase services will be disabled."
      );
  }
  return isConfigured;
};

export const isFirebaseConfigured = checkFirebaseConfig();

// Initialize Firebase only if the configuration is complete
const app = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

// Initialize services that can run on both server and client
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const storage = app ? getStorage(app) : null;

// Initialize client-side services conditionally
const remoteConfig = app && typeof window !== 'undefined' ? getRemoteConfig(app) : null;
const messaging = app && typeof window !== 'undefined' ? getMessaging(app) : null;


if (remoteConfig) {
    remoteConfig.settings.minimumFetchIntervalMillis = process.env.NODE_ENV === 'development' ? 10000 : 3600000;
    remoteConfig.defaultConfig = {
      // Add default values for your Remote Config parameters here
      // "welcome_message": "Welcome to vtuadda",
    };
}

export const requestForToken = async () => {
    if (!messaging || !(await isSupported())) {
        console.log("Firebase Messaging is not supported in this browser.");
        return null;
    }
    
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
            if (token) {
                console.log('FCM Token:', token);
                // Here you would typically send the token to your server to store it.
                // For now, we'll just log it.
                return token;
            } else {
                console.log('No registration token available. Request permission to generate one.');
                return null;
            }
        } else {
            console.log('Unable to get permission to notify.');
            return null;
        }
    } catch (err) {
        console.error('An error occurred while retrieving token. ', err);
        return null;
    }
};


export { app, auth, db, storage, remoteConfig, messaging };
