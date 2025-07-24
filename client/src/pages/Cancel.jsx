import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-red-200 w-full max-w-md p-4 py-6 flex flex-col justify-center items-center mx-auto gap-4 m-2 rounded'>
      <p className='text-red-900 text-lg font-semibold text-center'>
        Order Cancle
      </p>
          <Link to={'/'} className='border p-2 hover:bg-green-600 hover:text-black font-thin  bg-green-500 transition-all  text-white rounded'>
            Go to Home
          </Link>
    </div>
  )
}

export default Cancel