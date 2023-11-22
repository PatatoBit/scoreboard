// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA1xBY1Li9sLFWfxkJjoTU0Uu-AfTk3-9I',
	authDomain: 'scoreboard-18822.firebaseapp.com',
	projectId: 'scoreboard-18822',
	storageBucket: 'scoreboard-18822.appspot.com',
	messagingSenderId: '131737036563',
	appId: '1:131737036563:web:c83216d1d78492d5375ce6',
	measurementId: 'G-8SPKRXETBN'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
