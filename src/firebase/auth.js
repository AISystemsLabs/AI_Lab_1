import { auth } from './firebase';
import * as firebase from 'firebase';
import Rx from 'rxjs/Rx';

export const registerWithEmail = (email, password) => {
	return Rx.Observable.fromPromise(
		auth.createUserWithEmailAndPassword(email, password)
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
	return Rx.Observable.fromPromise(auth.signInWithPopup(provider));
};

export const registerWithGithub = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.GithubAuthProvider();
	return Rx.Observable.fromPromise(auth.signInWithPopup(provider));
};

export const registerWithFacebook = () => {
	auth.useDeviceLanguage();
	var provider = new firebase.auth.FacebookAuthProvider();
	return Rx.Observable.fromPromise(auth.signInWithPopup(provider));
};
