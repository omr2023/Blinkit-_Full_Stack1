import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummarApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCartAdmin from '../components/ProductCartAdmin'
import { IoSearch } from "react-icons/io5";
import EditProductAdmin from '../components/EditProductAdmin'



const ProductAdmin = () => {
  const [prodectData , setProdectData ] =  useState([])
  const [page , setPage] = useState(1)
  const [loading , setLoading ] = useState(false)
  const [totalPageCount , setTotalPageCount] = useState(1)
  const [search , setSearch ] = useState("")


  const fetchProductData = async() =>{
    try {
      setLoading(true)
        const response = await Axios({
          ...SummaryApi.getProducts,
          data :{
            page : page,
            limit : 12,
            search : search
            
          }
        })

        const {data : responseData } = response
        
        if(responseData.success){
          setTotalPageCount(responseData.totalNoPage)
          setProdectData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
          setLoading(false)
    }
  }
  useEffect(()=>{
    fetchProductData()
  },[page])

  const handleNext = () =>{
    if(page !== totalPageCount){
   setPage(preve => preve + 1)
    }
 
  }
  const handlePrevious = () =>{
    if(page > 1 ){
   setPage(preve => preve - 1)
    }
 
  }

      const handleOneChange = (e)=>{
      const {value} = e.target
      setSearch(value)
        setPage(1)
    }

    useEffect(()=>{
      let flag = true

      const interval =setTimeout(()=>{
        if(flag){
                  fetchProductData()
                  flag = false
        }
      },3000);
      return()=>{
        fetchProductData()
        clearTimeout(interval)
      }
    },[search])
    
  return (
         <section className=''>
      <div className='p-4  bg-white shadow-md flex items-center justify-between gap-4'>
                      <h2 className=' font-semibold'> Product</h2>
                      <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200'>
                        <IoSearch size={25}/>
                        <input 
                        type="text" 
                        placeholder='Search Product here....'
                        className=' outline-none h-full w-full px-4 bg-transparent'
                        value={search}
                        onChange={handleOneChange}
                        />
                      </div>

      </div>
      {
        loading && (
          <Loading/>
        )
      }
      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>
      <div className=' grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        
      {
        prodectData.map((p,index)=>{
          return(
            <ProductCartAdmin key={index} data={p} fetchProductData={fetchProductData} />
          )
        })
      }
      </div>
        </div>
          <div className='flex justify-between my-4'>
            <button onClick={handlePrevious} className='border border-primary-200 px-4 py-1 hover:bg-primary-100'>Previous</button>
            <button className='w-full bg-white'>{page}/{totalPageCount}</button>
            <button onClick={handleNext} className='border border-primary-200 px-4 py-1 hover:bg-primary-100'>Next</button>
          </div>
      </div>

      </section>
  )
}

export default ProductAdmin