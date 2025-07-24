import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import {  MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import EiditAdderssdetails from '../components/EiditAdderssdetails'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummarApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useGlobalContext } from '../provider/GlobalProvider'

const Address = () => {
   const [openAdress , setOpenAdress] = useState(false)
  const addressList = useSelector(state => state.address.addressList)
  const [openEdeit , setOpenEdeit] = useState(false)
  const [edeiteData , setEdeitData] = useState({})
  const {fetchAddaddress} = useGlobalContext()

  const handleDisableAddress = async(id)=>{
    try {
      const response = await Axios({
        ...SummaryApi.disableAdderss,
        data :{
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Remove")
        if(fetchAddaddress){
          fetchAddaddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className=''>
        <div className='bg-white shadow-lg px-2 py-2 font-semibold flex item-center justify-between gap-4'>
          <h2 className=' text-ellipsis line-clamp-1'><span className='text-green-600'>A</span>ddress</h2>
          <button onClick={()=>setOpenAdress(true)} className='border-green-600 rounded-full  p-2 bg-green-400 hover:bg-green-500 text-white'>
            Add address
          </button>
        </div>
        <div className="bg-blue-50 p-2 grid  gap-4 font-semibold">
              {
                addressList.flat().map((address , index)=>{
                  return (
                      <div key={index} className={`border rounded p-3 flex gap-4 hover:bg-white ${!address.status && "hidden"}`}>
                      <div className='w-full'>
                      <p>{address.aaddress_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.country} - {address.pincode} </p> 
                      <p>{address.mobile}</p>
                      </div>
                        <div className='px-2 flex items-center justify-center gap-2'>
                          <button onClick={()=>{
                            setOpenEdeit(true)
                            setEdeitData(address)
                          }} className='bg-green-300 p-1 rounded-full text-white hover:bg-green-700'>
                            <MdEdit size={25}/>
                          </button>
                          <button onClick={()=>handleDisableAddress(address._id)} className='bg-red-300 p-1 rounded-full text-white hover:bg-red-600'>
                            <MdDelete size={25}/>
                          </button>
                        </div>
                    </div>
                  )
                })
              }
          </div>
          
          <div onClick={()=>setOpenAdress(true)} className="h-16  bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer">
            Add address
          </div>



                    {
                        openAdress && (
                            <AddAddress close={()=>setOpenAdress(false)} />
                        )
                    }

                    {
                      openEdeit && (
                        <EiditAdderssdetails data={edeiteData} close={()=>setOpenEdeit(false)}/>
                      )
                    }
    </div>
  )
}

export default Address