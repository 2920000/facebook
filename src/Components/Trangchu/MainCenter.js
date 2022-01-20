import React, { useEffect, useState } from 'react'
import '../../Style/Main.css'
import MainContent from './MainContent';
import Slider from  'react-slick'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {IoIosAddCircle} from 'react-icons/io'
import { db } from '../../firebaseConfig';
import {onSnapshot,collection,updateDoc,doc} from 'firebase/firestore'
import {Link} from 'react-router-dom'
import {GrFormNextLink} from 'react-icons/gr'


function MainCenter({user,handleShowPost,posts}) {
   const navigate=useNavigate()
    const [ArrayStories,setArrayStories]=useState([])
  useEffect(()=>{
      onSnapshot(collection(db,'stories'),storiesDocs=>{
       const y= storiesDocs.docs.map(story=>({...story.data(),docId:story.id}))
       const storyOfUser = y.filter(storyUser=>storyUser.id===user.uid)
     const x= storyOfUser.map(story=>({...story,name:'Story của bạn'}))
     const storyNotOfUser = y.filter(storyUser=>storyUser.id!==user.uid)
     const newStoryNotOfUser=storyNotOfUser.slice(0,3)
     setArrayStories([...x,...newStoryNotOfUser])
      })
  },[])
 
     const handleClickStory=(docId,userWithStory)=>{
         updateDoc(doc(db,'stories',docId),{
           clicked:true
         })
     }
    const handleSwichTab=()=>{
        navigate('/allStories')
    }
    return (
        
        <div className='main-center'>
       
           <Stories>
           <Link to='/story' ><UserImg src={user.photoURL} /><Icon><Cirle><IoIosAddCircle /></Cirle></Icon><CreateText>Create Story</CreateText></Link>
           {ArrayStories.map(userWithStory=><Link  key={userWithStory.docId} to='/stories'><Story><img onClick={()=>{handleClickStory(userWithStory.docId,userWithStory)}} src={userWithStory.stories[0]} alt='' /></Story><StoryUser><img src={userWithStory.photo} alt='' /></StoryUser><UserNameOfStory>{userWithStory.name}</UserNameOfStory></Link>)}
              <IconWatchAllStories onClick={handleSwichTab}><GrFormNextLink/></IconWatchAllStories>
           </Stories>
          <div className='main-content'>
          <div className='status'>
               <div className='write-status'>
               <UserPicture1><img src={user.photoURL} alt='' /></UserPicture1>
               <input type='text' onClick={handleShowPost} className='input-status' placeholder="what's on your mind,T" />
               </div>
               <div className='features-main'>
                   <li><i class="fas fa-video"></i> Live video</li>
                   <li><i class="fas fa-images"></i> Photo/video</li>
                   <li><i class="far fa-smile"></i> Feeling/actity</li>
               </div>
           </div>                
               <div >
                  <MainContent posts={posts} user={user} />
               </div>

          </div>
        
           
          <OverLoad></OverLoad>
        </div>
    )
}
const OverLo=styled.div`
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-color: rgba(255,255,255,0.2);
display: none;
z-index: 2;
`
const Picture=styled.li`
position: relative;
box-sizing: border-box;
overflow: hidden;


img{
  height: 100%;
   display: block;
   object-fit :cover ;
    position: absolute;
    opacity: 1;
    border-radius: 10px;
    z-index: 1;

}
   
&:hover{
   ${OverLo}{
       display: block;
   }
   img{
       transform: scale(1.03);
       transition:   0.3s ease-out  ;
       
   }
}
`

const CreateRoom=styled.div`
display: inline;
border: 1px solid grey;
`
const UserPicture1=styled.div`
img{
    height: 40px;
width: 40px;
border-radius: 50%;

}

`
const Carousel =styled(Slider)`
padding: 10px 0 10px 15px;
border-radius: 8px;
background-color: #fff;
.slick-prev:before{
    position: relative;
    left: 50px;
    z-index: 10;
   
}
.slick-next:before{
    position: relative;
    right: 90px;
   color: #fff;
}
&>button:before {
font-size:50px; 
 opacity:1;
 position:relative;
 top:-10px;
}
&>button {
   z-index:4;
}

`
const UserImg=styled.img`
cursor: pointer;
width: 100%;
 height: calc(100% - 60px);
 border-radius: 10px;
 object-fit: cover;
image-rendering: pixelated;
`
const Cirle=styled.div`
background-color: #fff;
border-radius: 50%;
height: 40px;
width:40px;
display: flex;
align-items: center;
justify-content: center;
`
const Icon =styled.div`
width: 100%;
display: flex;
justify-content:center;
font-size: 40px;
color: #1876f2;
position: relative;
top: -25px;

`
const CreateText=styled.div`
width: 100%;
text-align:center;
font-size: 12px;
font-weight: bold;
position: relative;
top: -15px;
`
// const Post =styled.div`
// position: absolute;
// width: 500px;
// margin: auto;
// height: 300px;
// background-color: red;

// `
const OverLoad=styled.div`

`

const Stories=styled.div`
display: flex;
column-gap: 10px;
width: 100%;
a{
    overflow: hidden;
    width: 20%;
    background-color: #fff;
border-radius: 10px;
position: relative;
}   
`
const Story=styled.div`
width: 100%;
height: 200px;

img{
    border-radius: 10px;
    height: 100%;
    object-fit: cover;
   
}
&:hover{
    transform: scale(1.02);
    transition: transform 300ms linear;
    
}
`
const StoryUser=styled.div`
position: absolute;
top:15px;
left: 15px;
img{
    width: 30px;
    height: 30px;
    outline: 4px solid rgb(24 118 242);
    border-radius: 50%;
}
`
const UserNameOfStory=styled.div`
position: absolute;
bottom: 15px;
left: 15px;
color: #fff;
font-size: 13px;
`
const IconWatchAllStories=styled.div`
cursor: pointer;
position: absolute;
right: -20px;
top: 25%;
transform: translateY(-50%);
border-radius: 50%;
background-color: #fff;
padding: 5px;
font-size: 28px;
display: flex;
align-items: center;
justify-content: center;
  &:hover{
    &:after{
        content: 'See all stories';
        position: absolute;
        padding: 10px;
        color: #fff;
        background-color: rgb(95, 95, 95);
        border-radius: 10px;
        top: calc(100% + 5px);
        font-size: 12px;
        width: 80px;
        text-align: center;
    }

  }
`
export default MainCenter
