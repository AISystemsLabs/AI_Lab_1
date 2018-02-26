import { firestore } from './firebase';
import * as auth from './auth';
import * as firebase from 'firebase';
import Rx from 'rxjs/Rx';

export const getAnswersPerLevel = level => {
	console.log(auth.isLoggedIn());
	var email = auth.getUser().email;
	var usersCol = firestore.collection('users');
	var myUser = usersCol.doc(email);
	Rx.Observable.fromPromise(myUser.get()).subscribe(x => {
		return x.data()[level];
	});
};
