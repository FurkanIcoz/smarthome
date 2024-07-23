import { initializeApp } from "firebase/app";
import { getDatabase,ref,onValue,update } from "firebase/database";
import "firebase/database";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDbOElab7hums6C-KBMvEQ-pTusiRW4n-A",
    authDomain: "smart-home-7a23e.firebaseapp.com",
    databaseURL: "https://smart-home-7a23e-default-rtdb.firebaseio.com",
    projectId: "smart-home-7a23e",
    storageBucket: "smart-home-7a23e.appspot.com",
    messagingSenderId: "55220286877",
    appId: "1:55220286877:web:9a2a0b7e8d4c5575f1eb74"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);

  export {db, ref, onValue,update,auth,signInWithEmailAndPassword,createUserWithEmailAndPassword};