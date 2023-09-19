import React from 'react'
import "./ImageSetup.css"


function ImageSetup(props) {
  return (
    
        <div className='img-container'>
        <img src= {props.imgURL} alt='Nice Perfumes'/>
        </div>
    
  )
}

export default ImageSetup