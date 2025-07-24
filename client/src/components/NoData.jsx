import React from 'react'
import noDataImage from '../assets/nothing here yet.webp' // Assuming you have a no-data image in your assets

const NoData = () => {
  return (
    <div>
        <img 
        src={noDataImage} 
        alt="no data" 
        className='w-36  object-cover rounded-lg mx-auto'
        />
        
        <p className='text-center text-gray-500'>No Data Available</p>
    </div>
  )
}

export default NoData