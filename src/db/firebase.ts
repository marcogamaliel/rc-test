import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyArGiRgGd2MfE65_9sjE2QX49gt1sP0GmA",
  authDomain: "racional-exam.firebaseapp.com",
  databaseURL: "https://racional-exam.firebaseio.com",
  projectId: "racional-exam",
  storageBucket: "racional-exam.appspot.com",
  messagingSenderId: "669314004725",
  appId: "1:669314004725:web:48bd14a97d7db43c91f7bc",
}

// setLogLevel('debug');
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
