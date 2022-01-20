import './App.css';
import react,{useState, useEffect,useRef} from 'react';
import Header from './Components/pages/Header';
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Main from './Components/pages/Main';
import Main1 from './Components/pages/Main1';
import fire from './firebaseConfig';
import {useNavigate} from 'react-router-dom'
import {addDoc,collection,onSnapshot} from 'firebase/firestore'
import { db } from './firebaseConfig';
import InFor from './Components/InFor';
import PostStory from './Components/PostStory';
import Stories from './Components/Stories';
import AllStories from './Components/AllStories';

function App({handleLogout,user}) {
 
  return (
   <>
    <Router >
  
     <Header handleLogout={handleLogout} user={user} />
          <Routes>
             <Route path="/" element={<Main user={user}  />}/>
             <Route path="/main1" element={<Main1/>}/>
             <Route path="/infor"  element={<InFor user={user}/>} />
             <Route path="/story" element={<PostStory user={user} />} />
             <Route path='/stories' element={<Stories/>} />
             <Route path='/allStories' element={<AllStories/>}/>
          </Routes>        
  </Router>
  </>
       
  )
  }


export default App;
