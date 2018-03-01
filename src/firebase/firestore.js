import { firestore } from './firebase';
import * as auth from './auth';
import * as firebase from 'firebase';
import Rx from 'rxjs/Rx';

export const getAnswersPerLevel = (level, user) => {
	var email = user.providerData[0].email;
	var usersCol = firestore.collection('users');
	var myUser = usersCol.doc(email);
	return Rx.Observable.fromPromise(
		myUser.get().then(x => {
			return x.data()[level];
		})
	);
};

export const getRef = user => {
	var email = user.providerData[0].email;
	var usersCol = firestore.collection('users');
	var myUser = usersCol.doc(email);

	return myUser;
};

export const writeAnswersPerLevel = (level, value, user) => {
	var email = user.providerData[0].email;
	var usersCol = firestore.collection('users');
	var myUser = usersCol.doc(email);
	var obj = {};
	obj[level] = value;
	return Rx.Observable.fromPromise(myUser.set(obj, { merge: true }));
};
