import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyAABfmtM-MI7_AKaqO45UH3U7qy0zL_uig',
	authDomain: 'ai-lab-1.firebaseapp.com',
	databaseURL: 'https://ai-lab-1.firebaseio.com',
	projectId: 'ai-lab-1',
	storageBucket: 'ai-lab-1.appspot.com',
	messagingSenderId: '356139548510',
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
