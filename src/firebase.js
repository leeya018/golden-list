// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfigDev = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_DEV,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_DEV,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_DEV,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_DEV,
  appId: process.env.NEXT_PUBLIC_APP_ID_DEV,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_DEV,
  // measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}
// const firebaseConfigProd = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   // measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// }

// const firebaseConfig =
//   process.env.NODE_ENV === "development"
//     ? firebaseConfigDev
//     : firebaseConfigProd
const app = initializeApp(firebaseConfigDev)
export const db = getFirestore(app)
export const auth = getAuth(app)
// export const storage = getStorage(app)
