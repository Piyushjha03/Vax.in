
import React, { useState } from "react"
import axios from "axios";
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export const Register=(props)=>{

    const navigation=useNavigate()
    const[userDetails,setUserDetails]=useState({
        firstName:"",
        lastName:"",
        phnumber:"",
        dob:"",
        address:"",
        aadhar_number:"",
        gender:"",
        password:"",
    });

    const handleChange=(e)=>{
        setUserDetails((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

const handleClick=async(e)=>{
    e.preventDefault();
    try {
        await axios.post("https://vaxin-api.vercel.app/register",userDetails).then(
            ()=>{
                navigation('/login')
            }
            );
    } catch (error) {
        console.log(error);
    }

}
const onChangeDp=(date)=>{
const todate=`${date.$y}-${(date.$M)+1}-${date.$D}`;  
console.log(todate);
setUserDetails((prev)=>({...prev,dob:todate}));

}

    return(
        <>
        <div className="register-page">
        <div className="register-text">REGISTER</div>
        

            <form className="register-page-form" onSubmit={handleSubmit}>
                <input type="text"  placeholder="First Name" className="firstName" name="firstName" onChange={handleChange}/>
                <input type="text"  placeholder="Last Name" className="lastName" name="lastName" onChange={handleChange}/>
                <input type="tel"  placeholder="Phone Number" className="phnumber" name="phnumber" onChange={handleChange}/>
                {/* <input type="date"  placeholder="Date of Birth" className="dob" name="dob" onChange={handleChange}/> */}
                <DatePicker className="dob" placeholder="Date of birth" onChange={onChangeDp}  />
                <input type="text"  placeholder="Address" className="address" name="address" onChange={handleChange}/>
                <input type="text"  placeholder="Aadhar Number" className="aadhar_number" name="aadhar_number" onChange={handleChange}/>
                <input type="text"  placeholder="M/F" className="gender" name="gender" onChange={handleChange}/>
                <input type="password"  placeholder="password" className="password" name="password" onChange={handleChange}/>
                <button onClick={handleClick} className="create-bttn" type="submit">Create Account</button>
            </form>
 
            
            <button onClick={()=>{ props.toggle(0)}} className="login-bttn">LOGIN</button>
        </div>       
        </>
    
    )
}
   