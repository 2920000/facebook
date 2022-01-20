import react,{useState, useEffect} from 'react';
import {getAuth,createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import App from './App'
import Login from './Login';
import fire from './firebaseConfig';
import {useNavigate} from 'react-router-dom'
import {addDoc,collection,onSnapshot} from 'firebase/firestore'
import { db } from './firebaseConfig';
function Web() {
  const [user,setUser]=useState('')
  const provider = new GoogleAuthProvider()
  const auth =getAuth();
  onAuthStateChanged(auth,user=>{
     setUser(user)
  })
 const handeSignInWithGoogle =()=>{
  signInWithPopup(auth,provider)
}
  
    const handleLogout =()=>{
      signOut(auth)
    }
    const authListener =()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setUser(user)
        }else
        {
          setUser("")
        }
      })
    }
    useEffect(()=>{
      authListener()
    },[])
   
    return (
        <div>
{!user ? <Login
          
  handeSignInWithGoogle={handeSignInWithGoogle}
          /> :<App handleLogout={handleLogout}  user={user}  /> }
         
      
        </div>
    )
}

export default Web
