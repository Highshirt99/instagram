import React from 'react'
import { useState } from 'react'
import profileIcon from "../images/avatar.jpg"
import Button from './button'
import getPhotoUrl from 'get-photo-url'
import "./bio.css"
import { db } from './../dexie';
import { useEffect } from 'react'


const Bio = () => {
    const [formIsOpen, setFormIsOpen] = useState(false)

    const [details, setDetails] = useState(
        {
            name: "Aishat Akinyemi",
            about: ` I am a Frontend Developer,
            and I have so much interest in what I do.`
        }
    )

    const [profilePicture, setProfilePicture] = useState(profileIcon)

    useEffect(() => {
      const setDataFromDb = async () =>{
        const userDetailsFromDb = await db.bio.get("info")
        const profilePictureFromDb = await db.bio.get("profilePicture")
      userDetailsFromDb &&  setDetails(userDetailsFromDb)
      profilePictureFromDb && setProfilePicture(profilePictureFromDb)
      }

      setDataFromDb()
    })

// updating user details
        const updateDetails = async (event) =>
   {event.preventDefault()

    const objData = {
      name : event.target.username.value,
      about: event.target.aboutUser.value
    }
      setDetails(objData)

  await db.bio.put(objData, "info")

  setFormIsOpen(false)
}
       
  // updating profile Photo
  const updateProfilePicture = async () => {
const newProfilePicture = await getPhotoUrl("#profilePicture")
setProfilePicture(newProfilePicture)
await db.bio.put(newProfilePicture, "profilePicture")

  }


    // editForm
    const editForm = (
        <form action="" onSubmit={updateDetails} className='editBioForm'
    
   >
            <input type="text"
            name = "username" 
            id='username'
            placeholder='Your Name'
            value={details?.name}/>
            <br/> 
            <input type="text"  name = "aboutUser"
            id ="about"
            placeholder='About You'
            value={details?.about} />
            <br/>
            <button
            onClick ={() => setFormIsOpen(false)}className='btn btn-danger' type='button'>Cancel</button>
            <button className='btn btn-primary' type='submit' 
        >Save</button>
            </form>
    )

  return (
    <section className='bio'>
      
      <div
className="profilePhoto"
role ="button" 
title = "Click to edit photo.">
    <input type = "file" accept='image/*'
    name='photo' id = "profilePicture"
     style={{display: "none"}}/>

<label htmlFor="profilePicture"
  onClick={updateProfilePicture}>
    <img src = {profilePicture} 
     width = "100px"
     height="100px"
     style={{borderRadius: "50%",
     border: "transparent"}}
     alt = "profile icon"
  />
    </label>
</div>
    

<div className='info'>
<p className="name font-weight-bold">
  {details.name}
</p>
<p className="about">
 {details.about}
</p>

{formIsOpen ? editForm : <Button
onClick ={() => setFormIsOpen(true)}
formIsOpen ={formIsOpen}
/>}


</div>

    </section>
 
  )
}

export default Bio