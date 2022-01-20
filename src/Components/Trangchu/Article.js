import React,{useState,useRef,useEffect} from 'react'
import  '../../Style/Main.css'
import styled from 'styled-components'
import {BsThreeDots} from 'react-icons/bs'
import {collection, deleteDoc,doc,onSnapshot,updateDoc} from 'firebase/firestore'
import {db} from '../../firebaseConfig'
import {AiOutlineCloseSquare,AiOutlineLike,AiFillCaretDown} from 'react-icons/ai'
import {GiEarthAmerica} from 'react-icons/gi'
import {IoChatboxOutline} from 'react-icons/io5'
import {RiShareForwardLine} from 'react-icons/ri'
import {IoHeartCircleSharp} from 'react-icons/io5'
import {v4 as uuidv4} from 'uuid'
function Article({posts,user,image}) {
   const [hidePost,setHidePost]=useState(false)
   const [bottom,setBottom]=useState('')
   const [checkPost,setCheckPost]=useState('')
   const [commentUsers,setCommentUsers]=useState([])
   const [comment,setComment]=useState('')
   const [like,setLike]=useState(false)
   const [hideComment,setHideComment]=useState(true)
   const [allPosts,setAllPosts]=useState([])
   const scroll=useRef()
 
  
const showHideBox=(id)=>{
deleteDoc(doc(db,'posts',id));
}
const BottomComment={
    'borderTop':'1px solid #d5d6da'
 }
const showComments=(id)=>{
    setCheckPost(id)
   setBottom(BottomComment)

}
const addComment=(e,id,userName,userPicture,comments)=>{
    console.log(id)
    e.preventDefault()
    setComment('')
    updateDoc(doc(db,'posts',id),{
       commentContent:[
          ...comments, {
            id:uuidv4(),
            name:userName,
            message:comment,
            photo:userPicture
        }
       ]
    })
    updateDoc(doc(db,'posts',id),{
        commentNumber:comments.length +1
    })
    scroll.current.scrollIntoView({behavior:'smooth'})
}
useEffect(()=>{onSnapshot(collection(db,'posts'),allPostsDocs=>{
    setAllPosts(allPostsDocs.docs.map(post=>({...post.data(),idDoc:post.id})))
    })},[])
const  handleLike=(post,id)=>{

        const arrayPostUserLiked=allPosts.filter(post=>post.idDoc===id)
        const arrayReactionUserIdLiked=arrayPostUserLiked[0].Reaction
        const checkUserLiked=arrayReactionUserIdLiked.every(userLiked=>userLiked.userId!==user.uid) 
        if(checkUserLiked){
            updateDoc(doc(db,'posts',id),{
                 Reaction:[...arrayReactionUserIdLiked,{userId:user.uid}]
            })
        }
        else{
            const arrayIndex=arrayReactionUserIdLiked.map((userIdLiked,index)=>{
                if(userIdLiked.userId===user.uid){
                    return index
                }
            })
              const indexOfUserLiked=arrayIndex.find(index=>index!==undefined)
             
             arrayReactionUserIdLiked.splice(indexOfUserLiked,1)
             updateDoc(doc(db,'posts',id),{
                Reaction:[...arrayReactionUserIdLiked]
           })
       
        }
}

const handleToggleHideComment=(id)=>{
  const hideCommentBox=document.getElementById(id)
  const x=document.getElementsByClassName('hide')
  for(let i=0;i<x.length;i++){
      if(x[i]===hideCommentBox){
          continue
      }
    
      x[i].classList.remove('show')
  }
  hideCommentBox.classList.toggle('show')
}
const handleHideComment=(idComment,comments,id)=>{
    updateDoc(doc(db,'posts',id),{
        commentContent:comments.filter((comment)=>idComment!==comment.id)
     })
}

return (
   <div>
       {posts.map(post=>
       <Posts>
        <PostInfor>
        <Avatar><img src={post.photoURL}  alt=''/></Avatar>
          <UserName>{post.name}<Timestamp>{new Date(post.timestamp?.toDate()).toUTCString()}<GiEarthAmerica/></Timestamp></UserName>
            <HidePost onClick={()=>{setHidePost(!hidePost)}} ><BsThreeDots/>{hidePost&&<HideBox onClick={()=>{showHideBox(post.id)}}><AiOutlineCloseSquare/> Hide post</HideBox>}</HidePost>
        </PostInfor>
         <Text>{post.message}</Text>
         {post.picture?<Picture>   <img src={post.picture} alt='' /></Picture>: '' }
         <InteractiveInfo>  
             {post.Reaction.length>0?<Reaction ><ReactionIcon><IoHeartCircleSharp/></ReactionIcon> {post.Reaction.length} </Reaction>:<Reaction></Reaction>} <CommentAndShare>{post.commentNumber>0?<span>{post.commentNumber} comments</span>:''}{post.shares>0?<span>{post.shares} Shares</span>:''}</CommentAndShare>
         </InteractiveInfo>
         <Interactive  >
           <span   onClick={()=>{handleLike(post,post.id)}}>{post.Reaction.some(react=>react.userId===user.uid)?<><IoHeartCircleSharp style={{'font-size':'22px',color:'#ed2d4d'}}/> Like</>:<><IoHeartCircleSharp style={{'font-size':'22px'}}/> Like</> }</span>
           <span onClick={()=>{showComments(post.id)}}><IoChatboxOutline style={{'font-size':'22px'}}/> Comment</span>
           <span><RiShareForwardLine style={{'font-size':'22px'}}/> Share</span>
         </Interactive>
         {checkPost===post.id?<Comments style={BottomComment}>
             <FilterComment>Most relevant <AiFillCaretDown/></FilterComment>
             <Input><Form><img src={user.photoURL} alt='' /><input value={comment}  onChange={(e)=>{setComment(e.target.value)}}  placeholder='Write a comment'/><button onClick={(e)=>{addComment(e,post.id,user.displayName,user.photoURL,post.commentContent)}} style={{display:'none'}}>Them</button></Form></Input>
             <CommentContainer>{post.commentContent.map(messages=><Comment><div ref={scroll} ></div><UserPicture><img src={messages.photo} alt='' /></UserPicture><BoxAndInteraction><CommentBox><UserNameComment>{messages.name}</UserNameComment><Message>{messages.message}</Message></CommentBox><CommentInteract><Like>Like</Like><Reply>Reply</Reply></CommentInteract></BoxAndInteraction><HideComment onClick={()=>{handleToggleHideComment(messages.id)}}><BsThreeDots/>{<HideCommentBox id={messages.id} className='hide' onClick={()=>{handleHideComment(messages.id,post.commentContent,post.id)}}  >Hide Comment</HideCommentBox>}</HideComment></Comment>)}</CommentContainer>
         </Comments>:''}
        
   </Posts>     
 
       )}
   </div>
)
}

const Posts=styled.div`
background-color: #fff;
border-radius: 10px;
border:1px solid rgb(238 240 243);
box-shadow: 0 0 2px rgb(250 240 243);
margin: 15px 0;
`
const PostInfor=styled.div`
position: relative;
padding: 15px;
display: flex;
align-items: center;
column-gap: 10px;
`
const Timestamp=styled.div`
font-size: 13px;
display:flex;
align-items: center;
column-gap: 5px;
`
const Text=styled.div`
padding: 0 0 15px 15px;
`
const Picture=styled.div`
img{
max-height: 500px;
width: 100%;
}
`
const InteractiveInfo=styled.div`
display:flex;
justify-content: space-between;
padding: 10px 15px;
`
const Interactive=styled.div`
display: flex;
justify-content: space-between;
padding: 3px 0;
margin: 0 15px;
border-top: 1px solid #d5d6da;
span{
display: flex;
column-gap: 5px;

}
span{
    cursor: pointer;
    display: flex;
    justify-content:center;
    align-items: center;
    width: 200px;
    padding: 8px 0;
    border-radius: 7px;
    &:hover{
    background-color: #f0f2f5;
}
}

`
const Avatar=styled.div`

img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
`
const UserName=styled.div`
`
const Reaction=styled.div`
display: flex;
align-items: center;
`
const CommentAndShare=styled.div`
display: flex;
column-gap:10px;

`
const HidePost=styled.div`
cursor: pointer;
position:absolute;
right: 25px;
font-size: 20px;
border-radius: 50%;
color:grey;
    width: 33px;
    height:33px;
    display: flex;
    justify-content: center;
    align-items: center;
  
&:hover{
    background-color:#f0f2f5;
    transition:  background-color 300ms;
}
`
const HideBox=styled.div`
position: absolute;
border: 1px solid grey;
right: 0;
width: 120px;
border-radius: 10px;
top: 40px;
padding: 8px;
box-shadow: inset 0 0 2px grey;
display:flex;
align-items :center;
column-gap: 5px;
font-size: 15px;
`
const Comments=styled.div`
margin:0 15px;
padding-bottom: 20px;
`
const FilterComment=styled.div`
cursor: pointer;
display: flex;
justify-content: flex-end;
padding: 5px 0;
font-size: 15px;
align-items: center;
`
const Input=styled.div`
`
const Form=styled.form`
display: flex;
align-items:center;
column-gap: 10px;
img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
input{
    border:none;
    outline:none;
    background-color: #f0f2f5;
    width:100%;
    border-radius: 50px;
    height: 33px;
}
`
const CommentContainer=styled.div`

`
const Message=styled.div`
font-size: 15px;
`
const UserPicture=styled.div`
img{
    width: 35px;
height: 35px;
border-radius: 50%;
margin-right: 10px;
}
`
const UserNameComment=styled.div`
font-size: 12px;
font-weight: bold;
`
const CommentBox=styled.div`
background-color: #f0f2f5;
border-radius: 20px;
padding: 10px;

`
const Comment=styled.div`
display:flex;
margin: 10px 0;
`
const CommentInteract=styled.div`
display:flex;
font-size: 13px;
column-gap: 5px;
`
const Like=styled.div`
cursor: pointer;
margin-left: 7px;
font-size: 13px;
font-weight: bold;
color:grey;
`
const Reply=styled.div`
cursor: pointer;
font-size: 13px;
font-weight: bold;
color:grey;

`
const BoxAndInteraction=styled.div` 

`
const HideComment=styled.div`
cursor: pointer;
margin-top: 20px;
color: grey;
position: relative;
`
const HideCommentBox=styled.div`
position: absolute;
width: 150px;
padding: 10px;
box-shadow: 0 0 2px grey;
border-radius: 10px;
margin-right: 30px;
right: -100px;
background-color: #fff;
z-index: 10;

`
const ReactionIcon=styled.span`
font-size: 25px;
color: #ed2d4d;
display: flex;
align-items: center;
margin-right: 5px;
`
export default Article
