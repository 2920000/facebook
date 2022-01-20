import React ,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import '../Style/InforUser.css'
import { db } from '../firebaseConfig'
import {query,collection,onSnapshot,orderBy} from 'firebase/firestore'
import Article from './Trangchu/Article'
import {IoMdAddCircle} from 'react-icons/io'
import {HiPencil} from 'react-icons/hi'
import {Link} from 'react-router-dom'
function InFor({user}) {
    const [posts,setPosts]=useState([])
    const [friends,setFriends]=useState([])
    const q=query(collection(db,'posts'),orderBy('timestamp','desc'));
    useEffect(()=>{
        onSnapshot(q,post=>{
            setPosts(post.docs.map(doc=>
               ( {...doc.data(),id:doc.id})
            ))
        })
    },[])
    const f=query(collection(db,'users'));
    useEffect(()=>{
        onSnapshot(f,friend=>{
            setFriends(friend.docs.map(doc=>
               ( {...doc.data(),id:doc.id})
            ))
        })
    },[])

 const postsOfUser =  posts.filter(post=>post.name===user.displayName)
 const friendsOfUser= friends.filter(friend=>friend.name!==user.displayName)
    return (
        <>
            <UserPage>
                   <InforUser>
                      <PictureBackGround>
                           <UserAvatar>
                             <img src={user.photoURL} alt='' />
                           </UserAvatar>
                      </PictureBackGround>
                      <UserName>
                              <span>{user.displayName}</span>
                           </UserName>
                           <InforNav>
                                    <InforNavList>
                                    <li>Posts</li>
                                    <li>About</li>
                                    <li>Friends</li>
                                    <li>Photo</li>
                                    <li>Videos</li>
                                    <li>Check-Ins</li>
                                    <li>More</li>

                                    </InforNavList>
                                     <FriendStatus>
                                         <Link to='/story'><Span primary><IoMdAddCircle/>Add to story</Span></Link>
                                         <Span><HiPencil/>Edit profile</Span>
                                         <Span>...</Span>

                                     </FriendStatus>
                           </InforNav>
                   </InforUser>
                  <MainInforUser>
                       <MainInforUserLeft> 
                        <Intro><div>Intro </div></Intro>
                        <Photos><div>Photos<p>See All Photos</p></div></Photos>
                        <Friends  className='sticky' >
                            <div>Friends<p>See all Friends</p></div>
                             <ListFriends  >
                                {friendsOfUser.map(friend=><FriendImg src={friend.photo} alt='' />)}
                             </ListFriends>
                        </Friends>

                       </MainInforUserLeft>

                        <MainInforUserRight>
                         <WriteStatus>
                    <AvatarWithInput>
                       <UserPicture><img src={user.photoURL} alt='' /></UserPicture>
                        <Input><input type='text'  value='' className='input-status' placeholder="what's on your mind,T" /></Input>
                    </AvatarWithInput>
                        <Features>
                   <li><i class="fas fa-video"></i> Live video</li>
                   <li><i class="fas fa-images"></i> Photo/video</li>
                   <li><i class="far fa-smile"></i> Feeling/actity</li>
                   </Features>
                       </WriteStatus>
                       <Article user={user} posts={postsOfUser} />
                        </MainInforUserRight>
                </MainInforUser>
                
            </UserPage>
        </>
    )
}
const UserPage=styled.div`

`
const InforUser=styled.div`
background-color: #fff;
box-shadow: 0 0 5px var(--mainColor);
`
const PictureBackGround=styled.div`
max-width: 1100px;
height: 470px;
background-color: var(--mainColor);
margin: auto;
border-radius: 10px;
position: relative;

`
const UserAvatar=styled.div`
position: absolute;
bottom: -20px;
right: 50%;
transform: translateX(50%);

img{
    width: 170px;
    height: 170px;
    border-radius: 50%;
    outline: 5px solid #fff;
    /* border: 2px solid grey; */

}
`
const UserName=styled.div`
text-align: center;
font-size: 30px;
font-weight: bold;
margin-top: 30px;
`
const InforNav=styled.div`
display: flex;
align-items: center;
max-width: 1050px;

justify-content: space-between;
margin: 10px auto;
border-top: 1px solid grey;

`
const InforNavList=styled.div`
display: flex;
li{
    padding: 20px 10px;
}
`
const FriendStatus=styled.div`
display: flex;
column-gap: 10px;


`
const Span=styled.span`
cursor: pointer;
padding: 10px;
background-color: var(--mainColor);
border-radius: 5px;
display: flex;
align-items: center;
column-gap: 5px;
background-color: ${props=>props.primary?"#1b74e4":''};
color: ${props=>props.primary?'#fff':''};
&:hover{
}
`
const MainInforUser=styled.div`
display: flex;
max-width:1050px ;
margin: 10px auto;
column-gap: 15px;
`
const MainInforUserLeft=styled.div`
width: 40%;
display :flex ;
flex-direction: column;
row-gap: 15px;
margin-top: 10px;

`
const MainInforUserRight=styled.div`
width: 60%;

`
const Intro=styled.div`
padding: 15px 15px 20px 15px;
background-color: #fff;
border-radius: 10px;
box-shadow: 0 0 3px var(--boxShadow);

`
const Photos=styled.div`
padding: 15px 15px 20px 15px;
background-color: #fff;
border-radius: 10px;
position: relative;
box-shadow: 0 0 3px var(--boxShadow);

p{
    display: inline;
    position: absolute;
    right: 15px;

}

`
const Friends=styled.div`
padding: 15px 15px 20px 15px;
background-color: #fff;
border-radius: 10px;
box-shadow: 0 0 3px var(--boxShadow);

div{
    margin-bottom: 20px;
}
p{
    display: inline;
    position: absolute;
    right: 15px;

}
`
const UserPicture=styled.div`
img{
    width: 40px;
height: 40px;
border-radius: 50%;
}
`
const WriteStatus=styled.div`
border-radius: 10px;
box-shadow: 0 0 3px var(--boxShadow);
background-color: #fff;
margin: 10px 0;


`
const AvatarWithInput=styled.div`
display: flex;
align-items: center;
margin: 0 15px;
column-gap:10px;
padding: 10px 0;
input{
    width: 100%;
}
`
const Input=styled.div`
width: 100%;
`
const Features=styled.div`
display: flex;
margin: 0 15px;
border-top: 1px solid var(--mainColor);
li{
    cursor: pointer;
    width: 33.33%;
     text-align: center;
     padding: 7px 0;
     border-radius:10px;
     margin: 10px 0;
}
li:hover{
    background-color: var(--mainColor);
}
`
const ListFriends=styled.div`
display: flex;
flex-wrap: wrap;
column-gap: 10px;
width: 100%;
box-sizing: border-box;

`
const FriendImg=styled.img`
cursor: pointer;
width: 33%;
height: 125px;
border-radius: 10px;
margin-bottom: 10px;

`
export default InFor
