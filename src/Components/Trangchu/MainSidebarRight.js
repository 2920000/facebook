import React,{useEffect,useState,useRef} from 'react'
import {onSnapshot,collection,addDoc,query,orderBy,serverTimestamp} from 'firebase/firestore'
import '../../Style/Main.css'
import { db } from '../../firebaseConfig'
import styled from 'styled-components'
import {BsCameraVideoFill} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import {HiOutlineDotsHorizontal,HiVideoCamera} from 'react-icons/hi'  
import {CgLoadbar} from 'react-icons/cg'
import {RiCloseFill,RiPhoneFill,RiTicket2Line,RiFileGifFill} from 'react-icons/ri'
import {IoIosAddCircle} from 'react-icons/io'
import {ImFilePicture} from 'react-icons/im'
import { Button } from '@mui/material'
function MainSidebarRight({user}) {
    const [userLogins,setUserLogins]=useState([])
    const [chatBoxes,setChatBoxes]=useState([])
    const [boxId,setBoxId]=useState('')
    const [inputBoxChat,setInputBoxChat]=useState('')
    const [contenBoxChat,setContentBoxChat]=useState([])
    const [chatBoxUserPhoto,setChatBoxUserPhoto]=useState([])
    const [idPhotoSide,setIdPhotoSide]=useState('')
    const [photoSide,setPhotoSide]=useState(false)
    const [showCloseIcon,setShowCloseIcon]=useState(false)
    const scroll=useRef()
    
    useEffect(()=>{
        onSnapshot(collection(db,'users'),(users)=>{
            setUserLogins( users.docs.map(user=>user.data()))
        })
    },[])
    const userFilter=userLogins.filter(userLogin=>userLogin.name!==user.displayName)
    const handleShowChatBox=(boxId,userNameBox,userPhoto)=>{
        setBoxId(boxId)
    // setHideChatBox(!hideChatBox)
    setPhotoSide(!photoSide)
    // setIdPhotoSide('')
    setIdPhotoSide('')
        
        onSnapshot(collection(db,'chatBoxes'),chatBoxDocs=>{
          const x=  chatBoxDocs.docs.map(inforChatBox=>inforChatBox.data())
          setChatBoxes(x)
          const y= x.every(boxData=>boxData.name!==userNameBox)
            if(y){
               
                addDoc(collection(db,'chatBoxes'),{
                    id:boxId,
                    name:userNameBox,
                    photo:userPhoto
        
                })
            }  
           })
         
       
    }
   const handleSubmitText=(e)=>{
       e.preventDefault()
      setInputBoxChat('')
      addDoc(collection(db,'messages'),{
          id:user.uid,
          photo:user.photoURL,
          message:inputBoxChat,
          timestamp:serverTimestamp()
      })
      scroll.current.scrollIntoView({behavior:'smooth'});
      
   }
   useEffect(()=>{
       const q=query(collection(db,'messages'),orderBy("timestamp","asc"))
         onSnapshot(q,messages=>{
                setContentBoxChat(messages.docs.map(message=>message.data()))
         })
   },[])
   const hanldeHideChatBox=(photoChatBoxUser,idPhotoSide)=>{
    setChatBoxUserPhoto(photoChatBoxUser)
    // setHideChatBox(!hideChatBox)
    setBoxId('')
    setIdPhotoSide(idPhotoSide)
   }
  const handleClosePhotoSide=()=>{
    setIdPhotoSide('')

  }
  const handleShowAvatar=(boxId)=>{
    setIdPhotoSide('')
    setBoxId(boxId)


  }
  const handleCloseChatBox=()=>{
    setBoxId('')
  }
    return (
        <div className='main-right'>
            <div className='main-sidebar-right'>
               <div className='main-active-people'>
                 <Text>Sponsored</Text>
                 <FilterUserOnline><span>Contacts</span><IconsFilter><BsCameraVideoFill/><AiOutlineSearch/><HiOutlineDotsHorizontal/></IconsFilter></FilterUserOnline>
       
                   {userFilter.map(nameUser=><UserOnline onClick={()=>{handleShowChatBox(nameUser.id,nameUser.name,nameUser.photo)}}><UserImg><img src={nameUser.photo} alt=''/></UserImg><UserName>{nameUser.name}</UserName> <UserInfo></UserInfo> </UserOnline>)}
                   
               </div>
            
             {<TotalBox>  {chatBoxes.map(box=>  
         
         (boxId===box.id? <ChatBox>
              <HeaderChatBox>
                  <InforUser><Left><img src={box.photo} alt=''/>{box.name}</Left><Right><HiVideoCamera className='iconHeaderBox'/><RiPhoneFill className='iconHeaderBox'/><CgLoadbar className='iconHeaderBox' onClick={()=>{hanldeHideChatBox(box.photo,box.id)}} /><RiCloseFill onClick={handleCloseChatBox} className='iconHeaderBox'/></Right>  </InforUser>
                  <BoxChatFeature>

                  </BoxChatFeature>
              </HeaderChatBox>
                <ChatContent>
                <InforAnotherUser><img src={box.photo} alt=''/>{box.name}</InforAnotherUser>
                 {contenBoxChat.map(text=><Message className={user.uid===text.id?'rightMessage':'leftMessage'} ><UserPicture className={user.uid===text.id?'hideAvatar':'showAvatar'} ><img src={text.photo} alt=''/></UserPicture><UserMessage className={user.uid===text.id?'colorUser':'colorOtherUser'} >{text.message}</UserMessage></Message>)}
                 
                <div ref={scroll} ></div>
                </ChatContent>
              <InputChat>
                <IconInput><IoIosAddCircle className='iconInput'/><ImFilePicture className='iconInput'/><RiTicket2Line className='iconInput'/><RiFileGifFill className='iconInput'/></IconInput>  
               <input value={inputBoxChat}  onChange={(e)=>setInputBoxChat(e.target.value)} placeholder='Aa' /><ButtonSubmidInput disabled={!inputBoxChat} onClick={(e)=>{handleSubmitText(e)}} >Add</ButtonSubmidInput>
              </InputChat>   
              
          </ChatBox>: '')
          
         )}
         {chatBoxes.map(box=>(box.id===idPhotoSide?<><PhotoUserSide onClick={()=>{handleShowAvatar(box.id)}} >  {<img src={chatBoxUserPhoto} alt='' />}</PhotoUserSide>{<CloseSidePhotoUser><RiCloseFill onClick={handleClosePhotoSide} /></CloseSidePhotoUser>}</>:''))}

         </TotalBox>}

            </div>
        </div>
    )
    }
const IconsFilter=styled.div`
   display :flex ;
   column-gap: 20px;
font-size: 20px;
    `
const Text=styled.div`
color: grey;
padding: 10px 0px;
border-bottom: 1px solid grey;
font-weight: bold;
margin-left: 7px;

`    
const FilterUserOnline=styled.div`
display: flex;
justify-content: space-between;
color: grey;
font-weight: bold;
padding: 15px 7px;
`
const  UserInfo=styled.div`
/* width: 400px;
height: 100px;
background-color: red;
position: absolute;    
border-radius:10px; 
margin-right: -100px; */
`
const UserOnline=styled.div`
cursor: pointer;
display: flex;
position: relative;
align-items: center;
column-gap: 15px;
border-radius: 10px;
padding: 6px 5px 3px 7px;
&:hover{
    background-color: #e4e5e9;

    transition: background-color 220ms;
}
    `
const UserImg=styled.div`

img{
    width: 40px;
height: 40px;
border-radius: 50%;
}

`
const UserName=styled.div`
`
const ChatBox=styled.div`
position: fixed;
width: 340px;
height: 450px;
background-color: #fff;
bottom: 0;
right: 70px;
border-radius: 10px;
box-shadow: 0 0 2px rgb(227 229 232);
display: flex;
flex-direction: column;

`
const HeaderChatBox=styled.div`
`
const InforUser=styled.div`
display:flex;
align-items: center;
padding:10px;
justify-content: space-between;
box-shadow: 0 0 5px rgb(227 229 232);
`
const BoxChatFeature=styled.div`
`
const ChatContent=styled.div`
flex: 1;
padding: 20px 0 0 10px ;
overflow-y: scroll;

`
const InputChat=styled.form`
display: flex;
max-width: 100%;
align-items: center;
padding: 10px 5px;
input{
    border: none;
    outline: none;
    border-radius: 100px;
    background-color:#e5e6e9 ;
    height: 35px;
}
`
const TotalBox=styled.div`
display: flex;
width: 100%;
column-gap: 100px;
`
const Left=styled.div`
img{
  height: 35px;
  width: 35px;
  border-radius: 50%;
}
display:flex;
align-items: center;
column-gap: 5px;
`
const Right=styled.div`

display: flex;
color: grey;
`
const IconInput=styled.div`
display: flex;
column-gap: 2px;
`
const Form =styled.form`
`
const ButtonSubmidInput=styled.button`
display: none;
`
const UserPicture=styled.div`
img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    
}

`
const UserMessage=styled.div`
padding: 10px;
border-radius: 20px;
position: relative;
top: -10px;

`
const Message=styled.div`
display:flex;
column-gap: 10px;
margin-bottom: 10px;
`
const InforAnotherUser=styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
row-gap: 10px;
font-size: 19px;
margin-bottom: 40px;
img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
`
const SideAvatar=styled.div`
position: absolute;
`
const CloseSidePhotoUser=styled.div`
cursor: pointer;
position: absolute;
bottom:0;
background-color: #fff;
border-radius: 50%;
width: 14px;
height: 14px;
display: flex;
align-items: center;
justify-content: center;
font-size: 13px;
@keyframes showCloseIcon {
    from {
        transform: scale(0);
    }
    to{
        transform: scale(1);
    }
}
`
const PhotoUserSide=styled.div`
    position:absolute;
    bottom: 50px;
    right: 10px   ;
animation:showCloseIcon 200ms ;


img{
    cursor: pointer;
    width: 45px;
    height: 45px;
    border-radius: 50%;
}
&:hover{
    ${CloseSidePhotoUser}{
        display: block;
        animation:showCloseIcon 100ms ;
    }
} 

`
export default MainSidebarRight
