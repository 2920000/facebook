import React,{useState,useEffect} from 'react'
import styled ,{keyframes}from 'styled-components'
import { db } from '../firebaseConfig'
import { onSnapshot,collection, updateDoc ,doc} from 'firebase/firestore'
import {GrPrevious,GrNext} from 'react-icons/gr'
import {BsFacebook} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

function Stories() {
    const [stories,setStories]=useState(null)
    const [nextAndPreStory,setNextAndPreStory]=useState(0)
    const [nextAndPreUser,setNextAndPreUser]=useState(0)
    const [showAndHidePreButton,setShowAndHidePreButton]=useState(false)
    const [showAndHideNextButton,setShowAndHideNextButton]=useState(true)
    const [endStory,setEndStory]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        onSnapshot(collection(db,'stories'),storiesDocs=>{
            setStories(storiesDocs.docs.map(story=>({...story.data(),idDoc:story.id})))
        })
    },[])
if(stories!==null){
    var storyClicked= stories.filter(story=>story.clicked===true)
    var storyUnclicked=stories.filter(story=>story.clicked===false)
    var newStories=[...storyClicked,...storyUnclicked]
}
useEffect(()=>{
    if(nextAndPreStory===0&&nextAndPreUser===0){
        setShowAndHidePreButton(false)
                       
    } 
},[nextAndPreStory,nextAndPreUser])
   const handlePreStory=()=>{
    if(endStory===false){
        setEndStory(true)
        setShowAndHideNextButton(true)

    }
    else{
        setShowAndHideNextButton(true)
    setNextAndPreStory(pre=>pre-1)
    
           if(nextAndPreStory-1<0){
            setNextAndPreStory(newStories[nextAndPreUser-1].stories.length-1)
                setNextAndPreUser(nextAndPreUser-1)
               
          }  
    }      
   } 
   const handleNextStory=()=>{
    setShowAndHidePreButton(true)
    setNextAndPreStory(pre=>pre+1)
              if(nextAndPreStory+1>newStories[nextAndPreUser].stories.length-1){
                   setNextAndPreStory(0)
                   console.log(nextAndPreStory)
                   console.log(nextAndPreUser)
                   
                    if(nextAndPreStory+1>=newStories[nextAndPreUser].stories.length &&nextAndPreUser+1<newStories.length){
                        setNextAndPreUser(nextAndPreUser+1)
                        console.log(nextAndPreUser)
                        
                    }
                    else if(nextAndPreStory+1>=newStories[nextAndPreUser].stories.length && nextAndPreUser+1>=newStories.length){
                        setEndStory(false)
                        setShowAndHideNextButton(false)
                    }        
              }          
   }
   const handleBackToMain=()=>{
    updateDoc(doc(db,'stories',storyClicked[0].idDoc),{
       clicked:false
      
  })
 
    navigate('/')
   
}

    return (
        <>
             <StoriesPage>
                <StoriesPageLeft>
                <CloseStory>
                          <IconClose><AiFillCloseCircle onClick={handleBackToMain} /></IconClose>                         
                          <IconFb> <BsFacebook onClick={handleBackToMain}/>   </IconFb>
                     </CloseStory>
                </StoriesPageLeft>
                <StoriesPageRight>
                    <WatchStories>
                   {endStory&&<>{stories===null?'':<BarRunTime></BarRunTime> }

                        <NumberOfStories>

                        {stories===null?'':newStories[nextAndPreUser].stories.map(bar=><Bar number={newStories[nextAndPreUser].stories.length}></Bar>)}

                        </NumberOfStories>
                        <InforUserOfStory>
                            {stories===null?'':<ImgStory><img src={newStories[nextAndPreUser].photo} alt=''/></ImgStory>}
                            {stories===null?'':newStories[nextAndPreUser].name}
                        </InforUserOfStory></>}
                  {showAndHidePreButton&&<PreStory onClick={handlePreStory}><GrPrevious/></PreStory>}
                      {endStory?<Story>
                      {stories===null?'':<img src={newStories[nextAndPreUser].stories[nextAndPreStory]} alt=''/>}

                      </Story>:<EndStory>Hết Story</EndStory>}

                       
                         {showAndHideNextButton&&<NextStory onClick={handleNextStory}><GrNext/> </NextStory>}
                    </WatchStories>
                </StoriesPageRight>
             </StoriesPage>
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
const StoriesPage=styled.div`
display: flex;
height: 100vh;
`
const StoriesPageLeft=styled.div`
width: 24%;
height: 100vh;
z-index: 2;
background-color: #fff;
position: relative;

`
const StoriesPageRight=styled.div`
width: 77%;
background-color: black;
z-index: 2;
display: flex;
align-items: center;
justify-content: center;
`
const WatchStories=styled.div`
width: 360px;
height: 615px;
border-radius: 10px;
position: relative;

`
const Story=styled.div`
img{
border-radius: 10px;
object-fit: cover;
}
`
const PreStory=styled.div`
cursor: pointer;
position: absolute;
background-color: grey;
padding: 15px;
top: 50%;
left: -70px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
`
const NextStory=styled.div`
cursor: pointer;
position: absolute;
background-color: grey;
padding: 15px;
top: 50%;
right: -70px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
`
const InforUserOfStory=styled.div`
position: absolute;
display: flex;
column-gap: 10px;
top: 20px;
padding: 0 10px;
color: #fff;
align-items: center;
font-weight: bold;
`
const NumberOfStories=styled.div`
display: flex;
position:absolute;
column-gap: 5px;
top: 10px;
width: 100%;
justify-content: center;
padding: 0 10px;
`
const autoStory=keyframes`
from{
width: 0%;
background-color: #fff;

}
to{
width: 95%;
background-color: #fff;
}

`
const Bar=styled.div`

width: calc(100% / ${props=>props.number} );
height: 5px;
background-color: rgb(130,130,130);
border-radius: 50px;


`
const BarRunTime=styled.div`
position: absolute;
width: calc(95% / ${props=>props.number} );
  top: 10px;
  z-index:3;
    height: 5px;
    position: absolute;
    border-radius: 10px;
 
left: 10px;
`
const ImgStory=styled.div`
img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
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
const EndStory=styled.div`
background-color: grey;
height: 100%;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;
`
export default Stories
