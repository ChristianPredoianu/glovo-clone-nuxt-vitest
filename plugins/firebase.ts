// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBW7MiyVUv4nP42HRVr_LNTW1dssYXy6I4',
  authDomain: 'glovo-clone-54c44.firebaseapp.com',
  projectId: 'glovo-clone-54c44',
  storageBucket: 'glovo-clone-54c44.appspot.com',
  messagingSenderId: '956575343530',
  appId: '1:956575343530:web:9ba29e0656c01525c0c1d3',
  measurementId: 'G-QM1GJSKVYV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
