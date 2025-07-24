import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()


    console.log("location" , location?.state?.text);
  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-4'>
        <p className='text-green-600 font-bold text-lg text-center'> { Boolean(location?.state?.text) ? location?.state?.text : "Payment" } Successfully</p>
          <Link to={'/'} className='border p-2 hover:bg-green-600 hover:text-black font-thin  bg-green-500 transition-all  text-white rounded'>
            Go to Home
          </Link>
    </div>
  )
}

export default Success