import axios from "axios";
import { useEffect, useState } from "react";
import './account.css'
import { useContext } from 'react';
import { UserContext } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from '@y0c/react-datepicker';
// import '@y0c/react-datepicker/assets/styles/calendar.scss';
export const Account=()=>{
    const navigate=useNavigate()
    const {currentUser,loginmethod,setCurrentUser} =useContext(UserContext);
    const uh_id=(currentUser!=null)?currentUser[0].uhid:null;

    const[userDetails,setUserDetails]=useState(currentUser && {
        firstName:currentUser[0].firstName,
        lastName:currentUser[0].lastName,
        phnumber:currentUser[0].phnumber,
        dob:currentUser[0].dob,
        address:currentUser[0].address,
        aadhar_number:currentUser[0].aadhar_number,
        gender:currentUser[0].gender,
        password:currentUser[0].password,
    });

    const [response,setResponse]=useState(null);
    const [response2,setResponse2]=useState(null);

    useEffect(() => {
        if(currentUser!=null){
            console.log(currentUser);
            axios.post('https://vaxin-api.vercel.app/account',{uh_id})
            .then((res)=>{
               setResponse(res.data[0]);     
           }) 
           .catch(error => {
               console.error('Error fetching COVID-19 data:', error);
           })
        }
        
 
    }, [])
    
    useEffect(()=>{
        if(response!=null){
            axios.post('https://vaxin-api.vercel.app/account2',response)
            .then((res)=>{setResponse2(res.data[0])})
            .catch(error => {
                console.error('Error fetching COVID-19 data:', error);
            })
        }
       
    },)

    const handleChange=(e)=>{
        setUserDetails((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleSubmit=(e)=>{
        // e.preventDefault(); 
       
    }

const handleClick=async(e)=>{
    e.preventDefault();
    try {
        
        await axios.post('https://vaxin-api.vercel.app/update',userDetails)
        .then( async()=>{
            try {
                 await axios.post("https://vaxin-api.vercel.app/login",{userId:userDetails.aadhar_number,password:userDetails.password})
                 .then((response) => {
                 setCurrentUser(response.data)
                })
                 } catch (error) {
                    console.log(error); 
                 }
                
        }
             
            )

        console.log("new",userDetails);
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
        
        {currentUser &&
        <>
        <div className="account-wrapper">
        <div className="update-page">
        <div className="update-text">UPDATE</div>
            <form className="update-page-form" onSubmit={handleSubmit}>
                <input type="text" defaultValue={userDetails.firstName}  className="firstName" name="firstName" onChange={handleChange}/>
                <input type="text"  defaultValue={userDetails.lastName} className="lastName" name="lastName" onChange={handleChange}/>
                <input type="tel"  defaultValue={userDetails.phnumber} className="phnumber" name="phnumber" onChange={handleChange}/>
                <DatePicker className="dob" placeholder={userDetails.dob.substring(0,10)} onChange={onChangeDp}  />
                {/* <input type="date"  defaultValue={userDetails.dob} className="dob" name="dob" onChange={handleChange}/> */}
                <input type="text"  defaultValue={userDetails.address} className="address" name="address" onChange={handleChange}/>
                <input type="text"  defaultValue={userDetails.aadhar_number} className="aadhar_number" name="aadhar_number" onChange={handleChange}/>
                <input type="text"  defaultValue={userDetails.gender} className="gender" name="gender" onChange={handleChange}/>
                <input type="text"  defaultValue={userDetails.password} className="password" name="password" onChange={handleChange}/>
                <button onClick={handleClick} className="update-bttn" type="submit">Update Account</button>
            </form>
        </div> 
        <div className="slot-details-wrapper">
        <div className="slot-detail-text">YOUR BOOKED SLOT</div>
        <div className="slot-details-display">
        
        <div className="slot-details-user-detail">
                <div className="slot-details-uhid">UHID : {currentUser[0].uhid}</div>
                <div className="slot-details-userName">NAME : {`${currentUser[0].firstName+" "+currentUser[0].lastName}`}</div>
               <div className="slot-details-phNumber">PHONE NUMBER : {currentUser[0].phnumber}</div>
               <div className="slot-details-dob">DOB : {currentUser[0].dob.substring(0,10)}</div>
               <div className="slot-details-vaccination_status">VACCINATION STATUS : {currentUser[0].vaccination_status}</div>
               <div className="slot-details-address">ADDRESS : {currentUser[0].address}</div>
               <div className="slot-details-aadhar_number">AADHAR NUMBER : {currentUser[0].aadhar_number}</div> 
        </div>
        <div className="slot-details-camp-detail">
                <div className="slot-details-centre_name">{response2&& `centre_name : ${response2.centre_name}`}</div>               
               <div className="slot-details-center_address">{response2&& `center_address : ${response2.center_address}`}</div>               
               <div className="slot-details-state">{response2&& `state : ${response2.state}`}</div>               
               <div className="slot-details-district">{response2&& `district: ${response2.district}`}</div>               
               <div className="slot-details-centre_type">{response2&& `centre_type : ${response2.centre_type}`}</div>               
               <div className="slot-details-vaccine_type">{response&& `VACCINE : ${response.vaccine_type}`}</div>               
               <div className="slot-details-time_of_slot">{response&& `TIME : ${response.date_of_slot.substring(0,10)} IN ${response.time_of_slot}`}</div> 
        </div>            
                             
      
        </div>
               
        </div>
        </div>
        </>
        }

{!userDetails &&
<div className="login-first">
<Link to="/login" style={{textDecoration:"none"}}>Login First </Link>
</div>
    
}
     </>
    )
}