import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext=createContext();

 export  const UserContextProvider=({children})=>{
    const navigate =useNavigate();

    const [currentUser,setCurrentUser]=useState(null);

    const loginmethod=async(e)=>{
       await axios.post("https://vaxin-api.vercel.app/login",e).then((response) => {
        console.log("response:",response);
        setCurrentUser(response.data)
        if(response.data.length>0){
            navigate('/');
            // ,{state : {uh_id:response.data[0].uhid}}
        }
    })
    }

    return(
        <UserContext.Provider value={{currentUser,setCurrentUser,loginmethod}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;
