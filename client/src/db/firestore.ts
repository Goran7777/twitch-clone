import firebase from 'firebase/app';

import 'firebase/firestore';

const firebaseConfig: any = {
  apiKey: 'AIzaSyDDL4jTw2r_R7dA9TzxQs9hvRoG_gwG78w',
  authDomain: 'streamy-322208.firebaseapp.com',
  projectId: 'streamy-322208',
  storageBucket: 'streamy-322208.appspot.com',
  messagingSenderId: '543930287094',
  appId: '1:543930287094:web:abd4dc5ce43c547b75bdd7',
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
