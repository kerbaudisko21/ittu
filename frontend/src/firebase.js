// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBFsuPsV1HNAxgyMArwR5j-gFUFWh9do0',
  authDomain: 'ittu-9224b.firebaseapp.com',
  projectId: 'ittu-9224b',
  storageBucket: 'ittu-9224b.appspot.com',
  messagingSenderId: '727919044228',
  appId: '1:727919044228:web:8a6998fab0ba0888d084d1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
