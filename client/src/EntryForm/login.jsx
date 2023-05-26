import React, { useState , useContext } from "react"
import { UserContext, UserContextProvider } from "../context/context";



export const Login =(props)=>{

const[userId,setUserId]=useState('');
const[password,setPassword]=useState('');

const {loginmethod} =useContext(UserContext);

const loginApi=async()=>{
    try {
       await loginmethod({userId,password})
    } catch (error) {
        console.log("error:",error);
    }
    
    }

const handleSubmit=(e)=>{
    e.preventDefault();

}



    return(
    <>
        <div className="login-page">
        <form className="login-page-form" onSubmit={handleSubmit}>
            <div className="login-text">LOGIN</div>
             <input type="text" value={userId} onChange={(e)=>{setUserId(e.target.value)}} placeholder="Adhaar no." className="LoginuserId" id="userId" name="userId" />
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" className="Loginpassword" id="password" name="password"/>
            <button onClick={loginApi} className="login-bttn" type="submit">LOGIN</button>
        </form>
        <button onClick={()=>{ props.toggle(1)}} className="register-bttn">New User? Register</button>
        </div>
        
        
    </>
    )
    
}