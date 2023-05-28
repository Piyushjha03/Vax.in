import React from 'react';
import './camp.css'

import { useState, useEffect } from 'react'
import Map,{Marker} from 'react-map-gl';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../context/context';
// import REACT_APP_MAPBOX from 'client/src/.env'
// eslint-disable-next-line import/no-webpack-loader-syntax
// @ts-ignore 
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker.default;
const Token = 'pk.eyJ1IjoicGl5dXNoamhhIiwiYSI6ImNsZzl4MHZ3dDFidGkzZm85Nmdxa3B4cDAifQ.Jm2PEzVgGjD78Cl2-stBfA';
 
export const Camp=()=>{
    const location=useLocation()
    const navigation=useNavigate()
    const getresponse= location.state.getresponse;
    const date_of_slot=location.state.date_of_slot;
    const {currentUser} =useContext(UserContext);
    const uh_id=currentUser[0].uhid;
    const [isMouseOver,setMouseOver]=useState(false);
    const [isMouseOverSlot,setMouseOverSlot]=useState(false);
    
    
    const [slotDetails,setSlotDetails]=useState({
        c_id:getresponse.centre_id,
        uh_id:uh_id,
        date_of_slot:date_of_slot,
        vaccine_type:"None",
        time_of_slot:"Not Selected",
    });
    
   const handleSubmit=async()=>{
    try {
        await axios.post("https://vaxin-api.vercel.app/camp",slotDetails).then(
            ()=>{
                navigation('/account')
            }
            );
    } catch (error) {
        console.log(error);
    }
   }

                 return(
            <>
        
        <div className="transition"></div>
        <div className="camp-page-wrapper">
            <div className="camp-left-section">
                <div className="camp-details">
                    <div className="camp-name">
                        {getresponse.centre_name}
                    </div> 
                    <div className="camp-address">
                    {getresponse.center_address}
                    </div>
                    <div onClick={handleSubmit} className="book-slot-bttn">
                                BOOK
                    </div>
                    
                    
                </div>
                <div className="left-lower">
                    <div className="camp-booking-options">
                            <div className="vaccine-type" onMouseOver={()=>{setMouseOver(true)}} onMouseOut={()=>{setMouseOver(false)}}>
                                <div className="vaccine-type-animate"></div>
                                <div className="vaccine-type-text">
                                    Select your Vaccine
                                </div>
                                <div className="selected-vaccine-type">
                                    {slotDetails.vaccine_type}
                                </div>
                                {isMouseOver &&(
                                <div className="vaccine-type-dropdown">
                                    <div className="covaxin" onClick={()=>{ setSlotDetails((prev)=>({...prev,vaccine_type:"covaxin"}));console.log(slotDetails)}}>
                                        <div className="covaxin-container">
                                            <div className="covaxin-text">COVAXIN</div>
                                        </div>
                                    </div>
                                    <div className="covishield" onClick={()=>setSlotDetails((prev)=>({...prev,vaccine_type:"covishield"}))}>
                                    <div className="covishield-container">
                                            <div className="covishield-text">COVISHIELD</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                            
                            <div className="slot-timing" onMouseOver={()=>{setMouseOverSlot(true)}} onMouseOut={()=>{setMouseOverSlot(false)}}>
                            <div className="slot-timing-animate"></div>
                            <div className="slot-timing-text">
                                    Select your Slot
                            </div>
                            <div className="selected-slot">
                                    {slotDetails.time_of_slot}
                                </div>
                            {isMouseOverSlot &&(
                                <div className="slot-timing-dropdown">
                                    <div className="morning-slot" onClick={()=>{setSlotDetails((prev)=>({...prev,time_of_slot:"Morning"}))}}>
                                        <div className="morning-slot-container">
                                            <div className="morning-slot-text">8:00 A.M - 11:00 A.M</div>
                                        </div>
                                    </div>
                                    <div className="noon-slot"  onClick={()=>{setSlotDetails((prev)=>({...prev,time_of_slot:"Noon"}))}}>
                                    <div className="noon-slot-container">
                                    <div className="noon-slot-text">1:00 P.M - 3:00 P.M</div>

                                        </div>
                                    </div>
                                    <div className="evening-slot"  onClick={()=>{setSlotDetails((prev)=>({...prev,time_of_slot:"Evening"}))}}>

                                    <div className="evening-slot-container">
                                    <div className="evening-slot-text">4:00 P.M - 7:30 P.M</div>

                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                            

                        </div>
                        
                        </div>
                        </div>
            <div className="camp-right-wrapper">
                <div className="camp-right">
                <Map
                
                mapboxAccessToken={Token}
                    initialViewState={{
                        latitude: getresponse.latitude,
                        longitude: getresponse.longitude,
                        zoom: 12
                    }}
                    style={{width: "100%", height: "110%"}}
                    mapStyle="mapbox://styles/piyushjha/clg9xkuyl001w01pe4gso6vm3"
                    
                    
                    >
                        <Marker
                        longitude={getresponse.longitude}
                        latitude={getresponse.latitude}
                        color={"#A3A1FE"}
                        ></Marker>
                </Map>
                
                           
                </div>
            </div> 

        </div>

        </>
        )

}