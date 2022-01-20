import React,{useEffect,useState} from 'react'
import styled, { keyframes } from 'styled-components'
import {BsFacebook} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import {GrSettingsOption} from 'react-icons/gr'
import {IoMdPhotos} from 'react-icons/io'
import { db } from '../firebaseConfig'
import {collection,addDoc, onSnapshot,updateDoc,doc} from 'firebase/firestore'
import {ref,getStorage,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
function PostStory({user}) {
    const [avatar,setAvatar]=useState([])
    const [change,setChange]=useState()
    const [imageStories,setImageStories]=useState([])
    const [stories,setStories]=useState([])
    const [storiesOfUserLogin,setStoriesOfUserLogin]=useState([])
    const navigate=useNavigate()
    const storage=getStorage()
    const handleBackToInfor=()=>{
        navigate('/infor')
    }
    const handleBackToMain=()=>{
        navigate('/')
    }
    const handlePostStory=(e)=>{
         const file=e.target.files[0]
         setChange(e)
         setImageStories(e.target.files[0])
         file.preview=  URL.createObjectURL(file)
         setAvatar(file)
    }
    useEffect(()=>{
         return ()=>{
           avatar&&URL.revokeObjectURL(avatar.preview)

         }
    },[avatar])
    const handleDiscardStory=()=>{
        setAvatar(avatar.preview='')
  change.target.value=''
 
    }
     useEffect(()=>{
           onSnapshot(collection(db,'stories'),story=>{
              setStories(story.docs.map(doc=>({...doc.data(),docId:doc.id})))
           })
     },[])
    const handleShareStory=()=>{
        const   storageRef=ref(storage,'imageStories/'+imageStories.name)
        const uploadTask=uploadBytesResumable(storageRef,imageStories)
        uploadTask.on(
          'state_changed',
          (snapshot)=>{
          },
          (err)=>{
            console.log(err)
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then(downloadURL=>{   
                console.log(stories);

                const checkStoriesUser=stories.every(story=>story.id!==user.uid)
                console.log(checkStoriesUser)
                 if(checkStoriesUser){
                    addDoc(collection(db,'stories'),{
                        id:user.uid,
                        name:user.displayName,
                        clicked:false,
                        stories:[downloadURL],
                        photo:user.photoURL

                 })
                 }
                 else{
                    const preStories=stories.filter(story=>story.id===user.uid)
                    console.log(preStories)
                    console.log(preStories[0].stories)
                   updateDoc(doc(db,'stories',preStories[0].docId),{
                         name:user.displayName,
                         stories:[...preStories[0].stories,downloadURL]

                   })
                 }
            })
          }
        
        )
     
        navigate('/')
    }
    return (
       <> 
           <StoryPage>
                <StoryPageLeft>
                     <CloseStory>
                          <IconClose><AiFillCloseCircle onClick={handleBackToInfor}/></IconClose>                         
                          <IconFb> <BsFacebook onClick={handleBackToMain}/>   </IconFb>
                     </CloseStory>
                     <YourStory>
                        <YourStoryUp>
                        <p>Your story</p>
                          <OptionsIcon>
                               <GrSettingsOption/>
                          </OptionsIcon>
                        </YourStoryUp>
                          <UserInfor>
                              <Avatar src={user.photoURL} />
                              <UserName>{user.displayName}</UserName>
                          </UserInfor>
                     </YourStory>
                     {avatar.preview&& <RemoveOrShare>
                         <Span onClick={handleDiscardStory}>Discard</Span>
                         <Span primary onClick={handleShareStory} >Share to Story</Span>
                     </RemoveOrShare>}
                </StoryPageLeft>

                <StoryPageRight >
                         {avatar.preview? '':  
                         <CreateStory for='file'><CreateStoryIcon><IoMdPhotos/></CreateStoryIcon><input type='file' onChange={handlePostStory}  id='file' />  <p>Create a photo story</p></CreateStory>
                         }
                      {  avatar.preview&&<Preview>
                      <PreviewText>Preview</PreviewText>
                             <AvatarPreview> {<img src={avatar.preview} alt=''/>}</AvatarPreview>
                          </Preview> }
                </StoryPageRight>
                 
           </StoryPage>
       </> 
    )
}
const run=keyframes`
from {
    transform: translate(-30px);
}
to{
    transform: translate(0px);
}
`
const StoryPage=styled.div`
display: flex;
`
const StoryPageLeft=styled.div`
width: 24%;
height: 100vh;
z-index: 2;
background-color: #fff;
position: relative;

`
const StoryPageRight=styled.div`
width: 76%;
height: 100vh;
z-index: 2;
background-color: rgb(240,242,245);
display: flex;
justify-content: center;
align-items: center;

`
const CloseStory=styled.div`
display: flex;
column-gap: 5px;
padding: 5px 15px 0 15px;
align-items: center;
box-shadow: 0 4px 3px -2px rgb(235, 235, 235) ;
animation: ${run} 0.2s linear;

`
const IconClose=styled.div`
cursor: pointer;
font-size: 46px;
    color: rgb(165, 165, 165);
    &:hover{
        /* background-color: rgba(255,255,255,0.5); */
    }
`
const IconFb=styled.div`
cursor: pointer;
font-size: 40px;
color:#046ee5;
`
const YourStory=styled.div`
display: flex;
flex-direction: column;
row-gap: 20px;
padding: 20px 15px;
border-bottom:1px solid  rgb(165, 165, 165) ;
`
const OptionsIcon=styled.div`
font-size: 30px;
`
const YourStoryUp=styled.div`
display: flex;
justify-content: space-between;

p{
    font-size: 25px;
    font-weight: bold;
}
`
const UserInfor=styled.div`
display: flex;
align-items: center;
column-gap: 10px;
`
const Avatar=styled.img`
width: 55px;
height:55px;
border-radius: 50%;
`
const UserName=styled.div`
font-size: 20px;
`
const CreateStory=styled.label`
cursor: pointer;
width:220px;
height: 330px;
background-image: linear-gradient(to top,#80b2f8,#614be8);
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
row-gap: 10px;
p{
    color: #fff;
}
input{
    width: 100%;
    height: 100%;
    display: none;
}
`
const CreateStoryIcon=styled.div`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
background-color: #fff;
padding: 13px;
font-size: 20px;
box-shadow:  0 0 3px rgb(165, 165, 165) ;

`
const Preview=styled.div`
position: relative;
width: 975px;
height: 550px;
background-color: #fff;
border-radius: 10px;
box-shadow: 0 0 5px var(--boxShadow);
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
div{
   
}
`
const AvatarPreview=styled.div`
height: 80%;
position: absolute;
border-radius: 10px;
background-color: black;
max-width: 500px;
display: flex;
align-items: center;
img{
    object-fit: contain;
height: 70%;


}
`
const PreviewText=styled.div`
position: absolute;
left: 20px;
top: 10px;
font-weight: bold;
`
const RemoveOrShare=styled.div`
position: absolute;
bottom: 0;
padding: 15px;
display: flex;
justify-content: center;
column-gap: 10px;
background-color: #fff;
width: 100%;
box-shadow: 0 0 3px var(--boxShadow);
`
const Span=styled.span`
cursor: pointer;
padding: 8px 40px;
border-radius: 5px;
background-color: ${props=>props.primary?'#1b74e4':'rgba(220,222,225,1)'};
color:${props=>props.primary?'#fff':''};
`
export default PostStory
