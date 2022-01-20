
  import {initializeApp } from "firebase/app";
  import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyBHRG5_nt9GtD4BGnvs_GxUzvKQgZqMKxk",
    authDomain: "facebook-740ff.firebaseapp.com",
    projectId: "facebook-740ff",
    storageBucket: "facebook-740ff.appspot.com",
    messagingSenderId: "641912007725",
    appId: "1:641912007725:web:b8cb2567c5721b1cae9ca4"
    };
  
   const fire =initializeApp(firebaseConfig);
   const db=getFirestore(fire);
const storage=getStorage(fire)

   export default fire
   export {db,storage}
  