import { writable } from 'svelte/store';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface User {
	uid: string;
	email: string | null;
}

export const authUser = writable<User | null>(null);

export function signIn(email: string, password: string) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			console.table(userCredential);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
}

export function signOut() {
	auth.signOut();
}

auth.onAuthStateChanged((user) => {
	if (user) {
		authUser.set({
			uid: user.uid,
			email: user.email
		});

		console.log('User is signed in.');
	} else {
		authUser.set(null);

		console.log('User is signed out.');
	}
});
