import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDp2Y7axNGuttesW2rw0KbVPzpxspJGrNY",
    authDomain: "fireblogs-vuejs-ui.firebaseapp.com",
    projectId: "fireblogs-vuejs-ui",
    storageBucket: "fireblogs-vuejs-ui.appspot.com",
    messagingSenderId: "513328824819",
    appId: "1:513328824819:web:d58dd4de82ef9cd89bd286",
    measurementId: "G-SQV9QLZVEF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()
