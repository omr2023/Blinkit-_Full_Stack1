import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermision = ({children}) => {

    const user = useSelector(state => state.user)
    console.log('user in admin permission', user);
  return (
    <>
     {
        isAdmin (user.role) ? (
            <div className='bg-white min-h-[78vh]'>
                {children}
            </div>
        ) : (
            <div className='bg-white min-h-[78vh] flex items-center justify-center'>
                <h1 className='text-2xl font-bold text-red-500 bg-red-100 p-4'>You do not have permission to access this page.</h1>
            </div>
        )
           
        
     }
    
    </>
  )
}

export default AdminPermision