import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({cancel , confirm , close}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4'>
      <div className='bg-white p-6 rounded shadow-lg w-full max-w-md'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold mb-4'>Are you sure?</h2>
          <button onClick={close} className='bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded mr-2 transition-all duration-200' >
            <IoClose size={25} className=''/>
          </button>
        </div>
        <p className='text-gray-700 mb-6'>Do you really want to delete this item? This action cannot be undone.</p>
        <div className='flex justify-end gap-2'>
          <button 
            onClick={cancel} 
            className='bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded mr-2 transition-all duration-200'
          >
           
             Cancel
          </button>
          <button 
            onClick={confirm} 
            className='bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded transition-all duration-200'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox