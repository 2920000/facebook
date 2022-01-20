import React,{useState} from 'react'
import '../../Style/Main.css'
import { SidebarContent } from './SidebarContent'
import styled from 'styled-components'
import {VscChevronDown} from 'react-icons/vsc'
function MainSidebarleft({user}) {
    const [show,setShow]=useState(false)
    const [btnUp,setBtnUp]=useState(true)
    const [btnDown,setBtnDown]=useState(false)

    function handleshowDown(){
setShow(!show)
setBtnUp(!btnUp)
setBtnDown(!btnDown)
    }
    function handleshowUp(){
        setBtnDown(!btnDown)
        setShow(!show)
        setBtnUp(!btnUp)
    }
    function showScrollbar(){
        
    }

    return (
        <div className='main-left' onMouseOver={showScrollbar} >
           <ul className='main-left-list' id='style-scrollbar'>
                <li><User><Img src={user.photoURL} />{user.displayName}</User></li>
                <li><i class="fas fa-user-friends blue"></i> Friends</li>
                <li><i class="fas fa-users blue"></i> Groups</li>
                <li><i class="fas fa-store-alt blue"></i> Marketplace</li>
                <li><i class="fas fa-tv blue"></i> Watch</li>
               {btnUp&& <li onClick={handleshowDown} ><VscChevronDown className='IconMoreListSideBarLeft'/> See more</li>}
               {show&&<SidebarContent/>}
               {btnDown&& <li onClick={handleshowUp} >See less</li>}
           </ul>
           </div>
      
    )
}
const User=styled.div`
display: flex;
align-items: center;
column-gap: 10px;
`
const Img=styled.img`
width: 35px;
height: 35px;
border-radius: 50%;
`
export default MainSidebarleft
