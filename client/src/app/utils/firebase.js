import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyDU0_ivKEa5k4JolvV59QmObRBfRuoINCA',
    authDomain: 'pizza-e-com.firebaseapp.com',
    databaseURL: 'https://pizza-e-com-default-rtdb.firebaseio.com',
    projectId: 'pizza-e-com',
    storageBucket: 'pizza-e-com.appspot.com',
    messagingSenderId: '384613124222',
    appId: '1:384613124222:web:0f85b5f96570982a21f02f'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const projectStorage = firebase.storage(app);

export default projectStorage();
