import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
var firebaseConfig = {
    apiKey: "AIzaSyBA53akfvhs8__hqDSY8bYG6I8q5u7NGMQ",
    authDomain: "content-uploading.firebaseapp.com",
    databaseURL: "https://content-uploading-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "content-uploading",
    storageBucket: "content-uploading.appspot.com",
    messagingSenderId: "1028458090924",
    appId: "1:1028458090924:web:64a1793b34eac861376a09"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;