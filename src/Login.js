import React  from 'react'
import styled from 'styled-components'
import './Style/Login.css'
import './App.css'
function Login(props) {
 
   
    const {handeSignInWithGoogle}= props
    return (
        <div className='login' >
             <div className='container'>
                 <div className='title-login'>
                   <h2>facebook</h2>
                   <p >Facebook helps you connect and share with the people in your life.</p>
                 </div>
                 <Button><button onClick={handeSignInWithGoogle}>Đăng nhập với Google</button></Button>
                
              
             </div>
        </div>
    )
}
 const Button=styled.div`
 text-align: center;
 button{
 cursor: pointer;
 padding: 10px 25px;
 border-radius: 5px;
 border: 2px solid #1877f2;
 box-shadow: 0 0 5px #1877f2;
background-color: transparent;
&:hover{
    transform: scale(1.1);
    transition: transform 300ms linear;
}
 }
 `
export default Login
