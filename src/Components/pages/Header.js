import React,{useState,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import  '../../Style/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import   {Link} from 'react-router-dom'
import styled from 'styled-components'
import {FaFacebookMessenger} from 'react-icons/fa'
import {GoBell} from 'react-icons/go'
import {SiThreedotjs} from 'react-icons/si'
import {IoLogOut} from 'react-icons/io5'
import {IoMdSettings} from 'react-icons/io'
import {BsFillQuestionCircleFill,BsFillMoonFill} from 'react-icons/bs'
import {MdFeedback} from 'react-icons/md'
import {BsFacebook} from 'react-icons/bs'
function Header({handleLogout,user}) {
   const [logOut,setLogOut]=useState(false)
   const inforRef=useRef()
   const  navigate=useNavigate()
    function showLogOut(){
        setLogOut(!logOut)
    }
 function handle(e){
    const element= document.getElementsByClassName('nav-main-icon')
        for(var i=0;i<element.length;i++){
             element[i].style.color='grey'
             element[i].style.borderBottom='none'
        inforRef.current.style.color='black'
        inforRef.current.style.backgroundColor='#fff'

         
        }
        e.target.style.color=' #1877f2';
        e.target.style.borderBottom='3.5px solid #1877f2';

 }
     const handleTurnOffNavBar=()=>{
        const element= document.getElementsByClassName('nav-main-icon')
        for(var i=0;i<element.length;i++){
             element[i].style.color='grey'
             element[i].style.borderBottom='none';

        }
     }
  
     const handleOnMouseUp=()=>{
        document.getElementById('logout').style.backgroundColor='#e7f3ff'



       if( logOut===true){
        document.getElementById('logout').style.backgroundColor='rgba(223, 223, 223, 0.9)'
       }

     }
     const handleOnMouseDownInforIcon=()=>{
        inforRef.current.style.backgroundColor='#e7f3ff'
        inforRef.current.style.color='#3a8bf4'

        console.log( inforRef.current)
     }
     const handleComeBackToMain=()=>{
         navigate('/')
         inforRef.current.style.color='black'
         inforRef.current.style.backgroundColor='#fff'
     }
    return (
        
        <div className='header'>
            <div className='nav-header'>
                   <ul className='nav-left'>
                            <IconFaceBook onClick={handleComeBackToMain} >
                                <BsFacebook />
                            </IconFaceBook>
                            <div className='nav-input'  > 
                            <span className='icon-input'><SearchIcon/></span>
                            <input className='search-input' placeholder='Search Facebook'/>
                            </div>
                   </ul>
                   <ul  className='nav-main'  onClick={handle} >
                   <Link className='nav-main-link' to='/'><i className="fas fa-home active nav-main-icon"></i></Link>
                   <Link  className='nav-main-link' to='/main1'><i className="fas fa-tv nav-main-icon"></i></Link>
                   <Link  className='nav-main-link' to='/'><i className="fas fa-store nav-main-icon"></i></Link>
                   <Link  className='nav-main-link' to='/'><i className="fas fa-user-friends nav-main-icon"></i></Link>
                   <Link  className='nav-main-link' to='/'><i className="fas fa-gamepad nav-main-icon"></i></Link>   
                   </ul>
                   
                   <ul className='nav-right'>
                   <li><Link  to='/infor'><UserImgWithFirstName onMouseDown={handleOnMouseDownInforIcon} ref={inforRef}><UserPicture onClick={handleTurnOffNavBar} src={user.photoURL} />{user.displayName.split(' ').slice(-1)}</UserImgWithFirstName></Link></li>
                <li className='nav-right-item tooltips'><SiThreedotjs/><span className='tooltips-text' ></span></li>
                <li className='nav-right-item tooltips'><FaFacebookMessenger/><span className='tooltips-text'></span></li>
                <li className='nav-right-item tooltips'><GoBell/><span className='tooltips-text'></span></li>
                <li className='nav-right-item logout tooltips' onMouseUp={handleOnMouseUp}  id='logout' onClick={showLogOut} ><i className="fas fa-sort-down"></i>
                {logOut&&<ButtonOption>
                       <Infor></Infor>
                       <FeedBack><MdFeedback/><span>Give feedback</span></FeedBack>
                        <PersonalOptions>
                            <Option><IconOption><IoMdSettings/></IconOption><span>Setting & privacy</span></Option>
                            <Option><IconOption><BsFillQuestionCircleFill/></IconOption><span>Help & Support</span></Option>
                            <Option><IconOption><BsFillMoonFill/></IconOption><span>Display & Accessibility</span></Option>
                            <Option onClick={handleLogout}><IconOption><IoLogOut/></IconOption><span>Log Out</span></Option>
                        </PersonalOptions>
                  </ButtonOption>}
                  <span className='tooltips-text'></span>
                </li>
              
                   </ul>

            </div>
          
        </div>
    )
}
const IconFaceBook=styled.div`
cursor: pointer;
font-size: 40px;
color: #0e8cf1;
display: flex;
align-items: center;
`
const UserPicture=styled.img`
width: 25px;
height:25px;
border-radius:50%;

`
const UserImgWithFirstName =styled.div`
cursor: pointer;
display:flex;
align-items:center;
border-radius: 20px;
padding:5px 7px 5px 5px;  
column-gap:5px;  
&:hover{
  background-color: rgb(230, 230, 230);
  transition: background-color 100ms;

}
`
const Infor=styled.div`

`
const FeedBack=styled.div`
width:100%;
padding: 13px 10px;
border-radius: 5px;
display: flex;
align-items: center;
column-gap: 10px;
&:hover{
    background-color: rgba(223, 223, 223, 0.9);
    transition: background-color 100ms;

}
font-size:25px;
span{
    font-size: 15px;
}
margin: 10px 0;

`

const PersonalOptions=styled.div`
padding: 10px 0;
border-top: 1px solid grey;
`
const Option=styled.div`
width:100%;
padding: 10px 10px;
border-radius: 5px;
display: flex;
align-items: center;
column-gap: 10px;
&:hover{
    background-color: rgba(223, 223, 223, 0.3);
    transition: background-color 100ms;

}
font-size:22px;
span{
    font-size: 15px;
}

`
const ButtonOption=styled.div`
position: absolute;
top: 45px;
right: 0;
width: 350px;
border-radius: 10px;
box-shadow: 0 0 3px grey;
background-color: white;
padding:10px;

`
const IconOption=styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
padding: 7px;
background-color: rgba(223, 223, 223, 0.9);
`
export default Header
