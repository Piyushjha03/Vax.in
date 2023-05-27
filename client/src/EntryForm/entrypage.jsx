import main from '../images/main_img.jpg'
import '../App.js';
import './entrypage.css'
import { Login } from './login';
import { Register } from './register';
import { useState } from 'react';



export const Entrypage=()=> {
  const [togglevar,setToggleVar]=useState(0);

    return (
      <>
        <div className="entry-wrapper">
          <div className="entry-left">
          <p className="entry-text"></p>
          <img className='entry-img' src={main} alt="" />
        </div>
        <div className="entry-right">

        {togglevar===0 ? <Login toggle={setToggleVar}/> : <Register toggle={setToggleVar}/>}

        </div>
        </div>
      </>
        
      
    );
  }

