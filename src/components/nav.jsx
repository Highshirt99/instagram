import React from 'react'
import image from "../images/download.jpg";
import {FaHome, FaCommentAlt, FaCompass, FaHeart} from "react-icons/fa"
import "../App.css"
const Nav = () => {
  return (
   <nav className='d-flex justify-content-around bg-light pb-3'>
        <img className=' mt-3' src = {image} width = {"100px"}/>
        <input
         placeholder='search'
        className='text-center mt-3'/>
        <div className="d-flex ">
            <div className=' navIcon'> 
                 <FaHome/>
                 </div>
        
            <div className=' navIcon'>
                <FaCommentAlt />
            </div>
            <div className='navIcon'>
                <FaCompass />
            </div>
            <div className='navIcon'>
                <FaHeart />
            </div>
        </div>



   </nav>
  )
}

export default Nav