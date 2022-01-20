import React,{useEffect,useState} from 'react';
import styled from 'styled-components'
import {IoBook} from 'react-icons/io5'
import {RiAddLine} from 'react-icons/ri'
import { db } from '../firebaseConfig'
import {onSnapshot,collection,query,serverTimestamp} from 'firebase/firestore'
function AllStories() {
    const [allStories,setAllStories]=useState([])

      useEffect(()=>{
          const q= query(collection(db,'stories'))
          onSnapshot(q,stories=>{
            setAllStories(stories.docs.map(story=>story.data()))
          })
      },[])

  return <>
      <AllStoriesPage>
          <AllStoriesPageLeft>
            <LeftHeader>
               <TitleStory>Stories</TitleStory>
               <Span>Archive . Settings</Span>    
            </LeftHeader>
             <LeftCenter>
                <IconBookStory> <IoBook/></IconBookStory> Browse All
             </LeftCenter>

             <LeftFooter>
                    <span>Your Story</span>
                 <AddToYourStory>
                <AddStoryIcon><RiAddLine/></AddStoryIcon>  Add to Your Story
                 </AddToYourStory>
             </LeftFooter>
          </AllStoriesPageLeft>

          <AllStoriesPageRight>
               <ContainerRight>
                <Title>
                        <TitleLeft><div>All Stories</div><span>A collection of stories from friends, pages, and groups you follow</span></TitleLeft>
                        <TitleRight>Play All</TitleRight>
                    </Title>
                    <ContainerStories>
                         {allStories.map(story=><Story><PictureStory><img src={story.stories[0]} alt='' /><Avatar><img src={story.photo} alt='' /></Avatar><UserName>{story.name}</UserName></PictureStory></Story>)}
                    </ContainerStories>
               </ContainerRight>
          </AllStoriesPageRight>
      </AllStoriesPage>
  </>;
}
const Story=styled.div`
cursor: pointer;
width: 16.66%;
border-radius: 10px;
position: relative;
overflow: hidden;
`
const PictureStory=styled.div`
width: 100%;
height: 230px;

img{

 width: 100%;
 object-fit: cover;
border-radius: 10px;
height: 100%;

&:hover{
    transform: scale(1.02);
    transition: transform 300ms;
}
}
`
const UserName=styled.div`
position: absolute;
bottom: 10px;
color:#fff;
left:10px;
font-size: 13px;
`
const Avatar=styled.div`
position: absolute;
img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
top: 15px;
left: 15px;
`
const AllStoriesPage=styled.div`
padding-top:50px ;
display: flex;
height: 100vh;

`
const AllStoriesPageLeft=styled.div`
display: flex;
width: 23%;
flex-direction: column;
padding: 10px;
background-color: #fff;
padding-top: 20px;

`

const LeftHeader=styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
padding: 0 10px;
`
const TitleStory=styled.div`
font-size: 23px;
font-weight: bolder;
`
const Span=styled.div`
display: flex;
align-items: center;
font-size: 15px;
color:#1479fb;
`
const LeftCenter=styled.div`
padding: 8px;
display: flex;
align-items: center;
border-radius: 10px;
background-color: #e7f3ff;
box-shadow: inset 0 0 2px #e7f3ff;
`
const LeftFooter=styled.div`
padding: 10px 0;
display: flex;
justify-content: center;
flex-direction: column;
margin-top: 15px;
border-top: 1px solid grey;
span{
    user-select: none;
    font-weight: bold;
    padding: 10px 0;
}
`
const AddToYourStory=styled.div`
cursor: pointer;
display: flex;
align-items: center;
border-radius: 10px;
padding: 8px 10px;
&:hover{
    background-color: rgb(218, 218, 218);
    transition: background-color 300ms ;
}
`
const IconBookStory=styled.div`
padding: 7px;
font-size: 23px;
border-radius: 50%;
margin-right: 15px;
display: flex;
align-items: center;
justify-content: center;
background-color: #1877f2;
color:#fff;

`
const AddStoryIcon=styled.div`
font-size: 25px;
padding: 5px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(228,230,235,1);
margin-right: 15px;

`
const AllStoriesPageRight=styled.div`
width: 77%;
padding-top: 25px;

`
const Title=styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`
const TitleLeft=styled.div`

div{
font-weight: bold;
}
span{
color:grey;
}
`
const TitleRight=styled.div`
color:#1479fb ;
`
const ContainerStories=styled.div`
display: flex;
width: 100%;
flex-wrap: wrap;
column-gap: 15px;
`
const ContainerRight=styled.div`
max-width: 875px;
margin: auto;
`
export default AllStories;
