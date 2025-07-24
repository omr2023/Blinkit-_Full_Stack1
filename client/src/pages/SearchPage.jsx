import React, { useEffect, useLayoutEffect, useState } from 'react'
import CartLoading from '../components/CartLoading'
import SummaryApi from '../common/SummarApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CaardProduct from '../components/CaardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import Nodata from "../assets/nothing here yet.webp"
const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingArrayCart = new Array(10).fill(null)
  const [page , setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3) // Assuming the search query starts after '/q='

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText, // Replace with actual search term
          page: page,
        }
      })

      const {data: responseData} = response
      if (responseData.success) {
        if(responseData.page == 1 ){
          setData(responseData.data)
        }else{
          setData(preve => [...preve, ...responseData.data])
        }
        setTotalPage(responseData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  },[page , searchText])
  
  console.log("SearchPage page:", page);
  
  const handlefetchMore = async () => {
    if(totalPage > page){
      setPage(preve => preve + 1)
    }
  }
  return (
    <section>
      <div className='container mx-auto px-4 py-8 '>
        <h1 className='text-2xl font-bold mb-4'>Search Results: {data.length} </h1>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handlefetchMore}
          >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white p-4 rounded shadow'>
                      {
            data.map((p, index) => {
              return (
                <div className='shadow-current transition-all' key={p?._id+"serachProduact"+index} >
                  <CaardProduct data={p} key={p?._id+"serachProduact"+index} />
                </div>
              )
            })
          }
          {/* loading data */}
          {
            loading && (
              loadingArrayCart.map((_, index) =>{
                return (
                  <CartLoading key={"loadingsearchpage"+index}/>
                )
              })
          )
          }
        </div>
      </InfiniteScroll>
          {/* No data found */}
          {
            !loading && data.length === 0 && (
              <div className='flex flex-col items-center justify-center w-full'>
                <img src={Nodata} alt="No Data" className='w-full h-full max-w-xs max-h-xs' />
                <p className='text-gray-500'>No products found for "{searchText}"</p>
              </div>
            )
          }
      </div>
    </section>
  )
}

export default SearchPage