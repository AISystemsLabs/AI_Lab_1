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
						},
						{ merge: true }
					);
			})
			.catch(error => {
				console.log(error);
			})
	);
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
					},
					{ merge: true }
				);
		})
	);
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
					},
					{ merge: true }
				);
		})
	);
};

export const logOut = () => {
	return Rx.Observable.fromPromise(auth.signOut());
};
