import React, { useRef, useState,useEffect } from 'react'
import MainCenter from '../Trangchu/MainCenter'
import MainSidebarleft from '../Trangchu/MainSidebarleft'
import MainSidebarRight from '../Trangchu/MainSidebarRight'
import '../../Style/Main.css'
import styled from 'styled-components'
import {AiFillCloseCircle} from 'react-icons/ai'
import { db } from '../../firebaseConfig'
import {ref,getStorage, uploadBytes, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {addDoc,onSnapshot,collection,setDoc,doc,query,updateDoc,serverTimestamp,orderBy} from 'firebase/firestore'
import fire from '../../firebaseConfig'
import { GiConsoleController } from 'react-icons/gi'
function Main({user}) {
    const [show,setShow]=useState(false)
    const [scroll,setScroll]=useState(true)
    const [input,setInput]=useState('')
    const [posts,setPosts]=useState([])
    const [avatar,setAvatar]=useState('')
    const [closePicture,setClosePicture]=useState(false)
    const [image,setImage]=useState([])
    const [userIdLikedPost,setUserIdLikedPost]=useState()
    const bodyRef=useRef()
    const storage=getStorage()
    useEffect(()=>{
        onSnapshot(collection(db,'users'),(users)=>{
            const x =  users.docs.map(user=>user.data())
     const addUser = async()=>{
        await   addDoc(collection(db,'users'),{
             id:user.uid,  
             name:user.displayName,
             photo:user.photoURL
           })
        }
        const y= x.every(userLogin=>userLogin.id!==user.uid)
        if(y) {
            addUser()
          } 
        })
      },[])
    const handleShowPost=()=>{
        setShow(!show)
        setScroll(!scroll)
        bodyRef.current.style.overflow=`${scroll ?'hidden':'visible'}`
    }
    //Thêm ảnh vào storage firebase
    const handlePost=()=>{
        const   storageRef=ref(storage,'images/'+image.name)
        const uploadTask=uploadBytesResumable(storageRef,image)
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
                console.log(image.name)
                if(image.name===undefined){
                    addDoc(collection(db,'posts'),{
                        name:user.displayName,
                           photoURL:user.photoURL,
                        message:input,
                        Reaction:[],
                        commentContent:[],
                        timestamp:serverTimestamp(),
                        commentNumber:0,
                        shares:0
            
                    })
                }
                else{
                    addDoc(collection(db,'posts'),{
                        name:user.displayName,
                           photoURL:user.photoURL,
                        message:input,
                        picture:downloadURL,
                        Reaction:[],
                        commentContent:[],
                        timestamp:serverTimestamp(),
                        commentNumber:0,
                        shares:0
            
                    })
                }
            })
          }
        
        )
     
        handleShowPost()
        setImage([])
        setInput('')
        setAvatar('')
    }
    const q=query(collection(db,'posts'),orderBy('timestamp','desc'));
    useEffect(()=>{
        onSnapshot(q,post=>{
            setPosts(post.docs.map(doc=>
               ( {...doc.data(),id:doc.id})
            ))
        })
    },[])
    // useEffect(()=>{
    //   return ()=>{
    //     avatar &&   URL.createObjectURL(avatar.preview)
    //   }
    // },[avatar])
    const handleAvatar=(e)=>{
        const file=e.target.files[0]
        file.preview=URL.createObjectURL(file)
        if(e.target.files[0]){
            setImage(e.target.files[0])
            
          }
         setAvatar(file)
       
    }
    const handleClosePicture=()=>{
        setClosePicture(true)
    }
    const handleDeletePicture=()=>{
        setAvatar(false)
    }
  
    return (
        <div className='main-trangchu' ref={bodyRef} >
           <MainSidebarleft user={user}/>
           <MainCenter user={user} handleShowPost={handleShowPost} posts={posts} image={image.name}  />
           <MainSidebarRight user={user}/>
           {show&&<Post>
             <Title><h3>Create post</h3><IconClose onClick={()=>{handleShowPost()}} ><AiFillCloseCircle/></IconClose></Title>
              <User> <UserPicture src={user.photoURL} /> <UserName>{user.displayName}</UserName> </User>
              <Content>
                <Input value={input} onChange={(e)=>setInput(e.target.value)}  type='text' placeholder="What's on your mind ?" />
                <Img>{avatar&&<img src={avatar.preview} alt='' />}
                {closePicture&& <ClosePicture onClick={handleDeletePicture} ><AiFillCloseCircle/></ClosePicture>}
                                
                </Img>
              </Content>
              <File><input type='file' onChange={handleAvatar}  onClick={handleClosePicture} />  </File>
              <Button><button disabled={!input} onClick={handlePost} >Post</button></Button>
           </Post>}
        </div>
    )
}
const Post =styled.div`
position: absolute;
width: 500px;

background-color: #fff;
margin: auto;
z-index: 10;
border-radius:10px;
box-shadow: 0 0 10px grey;

`
const Title=styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 20px 15px;
border-bottom: 1px solid grey;
h3{
    text-align:center;
}
`
const IconClose=styled.div`
cursor:pointer;
position: absolute;
right: 0;
font-size: 35px;
right: 15px;
top: 14px;
`
const User=styled.div`
position: relative;
padding:15px 15px;
display: flex;
align-items: center;
column-gap: 10px;
`
const Content=styled.div`
max-height: 300px;
overflow-y: scroll;
padding: 15px 10px;

::-webkit-scrollbar{
    background-color: transparent;
    width:8px;
}
::-webkit-scrollbar-track{
 
}
::-webkit-scrollbar-thumb{
    background-color: transparent;
    border-radius: 40px;
   
}
&:hover{
    ::-webkit-scrollbar-thumb{
    background-color: #e4e6eb;
    border-radius: 40px;
   
}
transition:background-color 2s;
    }
   
`

const Img=styled.div`
position: relative;
padding: 10px;
/* border: 1px solid grey; */
border-radius: 10px;
`
const Input=styled.input`
width: 100%;
border: none;
outline: none;
`
const UserPicture=styled.img`
width: 40px;
height:40px;
border-radius: 50%;
`
const UserName=styled.div`

`
const Form=styled.div`
padding: 0 15px;
input{
    width: 100%;
    height: 150px;
    padding: 0 0 100px 0;
   border: none;
   outline: none;
   font-size: 25px;
}
`
const File=styled.div`
padding: 0 15px;

input{
    cursor: pointer;
   width: 100%;

}
`
const Button=styled.div`
padding: 20px 15px;
width: 100%;
button{
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    padding: 10px 0;
    border: none;
    background-color: #1b74e4;
    font-weight: bold;
    color: #fff;
}
`
const ClosePicture=styled.div`
cursor: pointer;
position: absolute;
right: 15px;
top: 15px;
font-size: 32px;
color: #fff;
`
export default Main
