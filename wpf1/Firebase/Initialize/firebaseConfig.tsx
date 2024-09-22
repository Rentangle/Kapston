// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyC2Rv_2q8F997X6-2S8KLwViFXb3oIVPYY',
    authDomain: 'integrated-2970a.firebaseapp.com',
    projectId: 'integrated-2970a',
    storageBucket: 'integrated-2970a.appspot.com',
    messagingSenderId: '113019951075',
    appId: '1:113019951075:android:01653a3c4c095a11ad72d6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
