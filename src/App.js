import React from 'react'
import ImageSetup from './Component/ImageSetup/ImageSetup'
import data from './Component/data'


function App() {
  const photoSection = data.map(function(segment){
    return <  
    ImageSetup
    key={segment.id}
    {...segment}
      />
  })
  return (
    <div>
    <div className='gallery-section'>
      {photoSection}
    </div>
    </div>
  )
}

export default App