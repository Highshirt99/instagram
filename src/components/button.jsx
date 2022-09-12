import React from 'react'

const Button = ({
    onClick} ) =>{

  return (
    <button 
    onClick ={onClick}
    className='btn btn-primary'
     style={{width: "100px"}}>Edit</button>
  )
}

export default Button