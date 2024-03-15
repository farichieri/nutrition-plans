import { collection, doc, getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(app) : null
);

// Collections

// Auth
export const userDocRef = ({ userID }: { userID: string }) =>
  doc(db, "users", userID);

// Notifications
export const notificationsCollection = collection(db, "notifications");
export const userNotificationsCollection = (userID: string) =>
  collection(db, "users", userID, "notifications");

// Meals
export const userMealsCollection = (userID: string) =>
  collection(db, "users", userID, "meals");
export const userMealsSettingsCollection = (userID: string) =>
  collection(db, "users", userID, "settings", "mealsSettings", "meals");
export const userMealSettingDoc = ({
  userID,
  mealID,
}: {
  userID: string;
  mealID: string;
}) => doc(db, "users", userID, "settings", "mealsSettings", "meals", mealID);
export const userMealDoc = ({
  userID,
  mealID,
}: {
  userID: string;
  mealID: string;
}) => doc(db, "users", userID, "meals", mealID);

// Emails
export const newsletterEmailsCollection = collection(
  db,
  "newsletter_subscribers"
);
