import { auth, firestore } from './firebase';
import * as firebase from 'firebase';
import Rx from 'rxjs/Rx';

export const registerWithEmail = (email, password) => {
	return Rx.Observable.fromPromise(
		auth.createUserWithEmailAndPassword(email, password).then(() => {
			firestore
				.collection('users')
				.doc(email)
				.set(
					{
						email: email,
						isPasswordRegistered: true,
						novice: [-1, -1, -1, -1],
						beginner: [-1, -1, -1],
						competent: [-1, -1, -1],
						proficient: [-1, -1, -1],
						expert: [-1, -1, -1],
					},
					{ merge: true }
				)
				.then(() =>
					Rx.Observable.fromPromise(auth.currentUser.sendEmailVerification())
				);
		})
	);
};

export const loginWithEmail = (email, password) => {
	return Rx.Observable.fromPromise(
		auth.signInWithEmailAndPassword(email, password)
	);
};

export const registerWithGoogle = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('email');
	return Rx.Observable.fromPromise(
		auth
			.signInWithPopup(provider)
			.then(res => {
				console.log(res);
				firestore
					.collection('users')
					.doc(res.user.providerData[0].email)
					.set(
						{
							email: res.user.providerData[0].email,
							isGoogleRegistered: true,
							novice: [-1, -1, -1, -1],
							beginner: [-1, -1, -1],
							competent: [-1, -1, -1],
							proficient: [-1, -1, -1],
							expert: [-1, -1, -1],
						},
						{ merge: true }
					);
			})
			.catch(error => {
				console.log(error);
			})
	);
};

export const logInWithGoogle = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('email');
	return Rx.Observable.fromPromise(auth.signInWithPopup(provider));
};

export const registerWithGithub = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.GithubAuthProvider();
	return Rx.Observable.fromPromise(
		auth.signInWithPopup(provider).then(res => {
			console.log(res);
			firestore
				.collection('users')
				.doc(res.user.providerData[0].email)
				.set(
					{
						email: res.user.providerData[0].email,
						isGithubRegistered: true,
						novice: [-1, -1, -1, -1],
						beginner: [-1, -1, -1],
						competent: [-1, -1, -1],
						proficient: [-1, -1, -1],
						expert: [-1, -1, -1],
					},
					{ merge: true }
				);
		})
	);
};

export const logInWithGithub = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.GithubAuthProvider();
	provider.addScope('email');
	return Rx.Observable.fromPromise(auth.signInWithPopup(provider));
};

export const registerWithFacebook = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.FacebookAuthProvider();
	return Rx.Observable.fromPromise(
		auth.signInWithPopup(provider).then(res => {
			firestore
				.collection('users')
				.doc(res.user.providerData[0].email)
				.set(
					{
						email: res.user.providerData[0].email,
						isFacebookRegistered: true,
						novice: [-1, -1, -1, -1],
						beginner: [-1, -1, -1],
						competent: [-1, -1, -1],
						proficient: [-1, -1, -1],
						expert: [-1, -1, -1],
					},
					{ merge: true }
				);
		})
	);
};

export const logInWithFacebook = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.addScope('email');
	return Rx.Observable.fromPromise(auth.signInWithPopup(provider));
};

export const logOut = () => {
	return Rx.Observable.fromPromise(auth.signOut());
};

export const isLoggedIn = () => {
	return firebase.auth().currentUser != null;
};

export const getUser = () => {
	return firebase.auth().currentUser.providerData[0];
};
