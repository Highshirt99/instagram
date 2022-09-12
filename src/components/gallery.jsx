import React, {useState} from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import "./gallery.css"
import getPhotoUrl  from 'get-photo-url';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../dexie';

const Gallery = () => {

  const [hover, setHover] = useState(true)


  const allPhotos = useLiveQuery(() => db.gallery.toArray(), [])

  const addPhoto = async () => {
  db.gallery.add({
    url: await getPhotoUrl("#adPhotoInput")
  }) 

}

const removePhoto = (id) => {
  db.gallery.delete(id)
}
  

  return (
<div className='container mt-5'>
<input type="file" name ="photo"
id = "adPhotoInput"
style={{display: "none"}}/>
<label htmlFor='adPhotoInput'
style={{position:"absolute",
bottom: "0",
right: "0",
fontSize: "2.5em"}}
onClick = {addPhoto}>
<FaPlusSquare className='addPhotoButton'
/>
</label>

<section className='gallery' >
  {!allPhotos && <p>Loading...</p> }
  { allPhotos?.map((photo) => (
  <div className='item' key = {photo.id}>
  <img src = {photo.url} 
  className = "image"
  width="250px"
  height= "250px"
  alt = ""
  onMouseEnter = {() => setHover(true)}
  onMouseLeave = {() => setHover(false)}

/>
<button 
onClick = {() => removePhoto(photo.id) }
className='btn btn-danger btn-sm'
style={{display: hover ? "block" :"none"}}>Delete</button>
</div>
  )
)
}
 </section>
 </div>
  )
}

export default Gallery