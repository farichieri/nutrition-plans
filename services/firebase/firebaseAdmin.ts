import * as firebaseAdmin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

const firebaseConfig = {
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!firebaseAdmin.apps.length) {
  initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseConfig),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

const adminDB = firebaseAdmin.firestore();

export { firebaseAdmin, adminDB };
