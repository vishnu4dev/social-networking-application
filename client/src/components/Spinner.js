import React from 'react'
import Loader from '../assets/img/amebaLoader.gif';

export default  ()=>{
    return <img 
          src={Loader}
          style={{width:'100px', margin:'20% auto',display:'block'}}
          alt="Loading..." />  
}
