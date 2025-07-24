
import React, { useEffect } from 'react';
import { useState } from 'react';
import UploadSubCategoriesModle from '../components/UploadSubCategoriesModle';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummarApi';
import DisplayTable from '../components/DisplayTable';
import {createColumnHelper} from '@tanstack/react-table'
import ViewImage from '../components/ViewImage';
import {LuPencil} from "react-icons/lu"
import {MdOutlineDeleteForever} from "react-icons/md"
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast';
const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);

  const [data ,  setData ] = useState([])

     // eslint-disable-next-line no-unused-vars
     const [isLoading, setIsLoading] = useState(false);
     const columnHelper = createColumnHelper()
 const [ImageUrl, setImageUrl] = useState("");
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);

  const [editData , setEditData] = useState({
  _id : "",

});

const [deleteSubCategory , setDeleteSubCategory] = useState({
  _id : ""
})

const [openDeleteConfirmation , setOpenDeleteConfirmation] = useState(false)
const fetchSubCategory = async() =>{
  setIsLoading(true)
  try {
    const response = await Axios({
      ...SummaryApi.getSubCategory
    })
          
    const { data : responseData } = response

    if(responseData.success){
      setData(responseData.data)
    }

  } catch (error) {
    AxiosToastError(error)
  }finally{
    setIsLoading(false)
  }
}

useEffect(()=>{
  fetchSubCategory()
},[])

  const column = [
    columnHelper.accessor('name',{
      header : "Name"
    }),
    columnHelper.accessor('name',{
      header : "Image",
      cell : ({row}) =>{
        console.log("row" , row);
        
        return <div className='flex justify-center items-center'>
          <img 
        src={row.original.image}
        alt={row.original.name}
        className='w-10 h-10 object-scale-down m-auto mt-2 cursor-pointer'
        onClick={()=>{
          setImageUrl(row.original.image)
        }}
        />
        </div>
      }
    }),
    columnHelper.accessor("category",{
      header: "Category",
      cell : ({row})=>{
        return(
          <>
          {
            row.original.category.map((c , index)=>{
              return(
                <p key={c._id+"table"} className=' shadow-sm'>{c.name}</p>
              )
            })
          }
          </>
        )
      }
    }),
        columnHelper.accessor("_id",{
      header: 'Actions',
      cell: ({row}) =>{
        return(
          <div className='flex items-center justify-center gap-4'>
              <button  className='p-2 rounded-full bg-green-100 hover:bg-green-400 transition-colors'>
             <LuPencil onClick={()=>{
              setOpenEditSubCategory(true) 
              setEditData(row.original)

              }} size={20} />
          </button>
          {/* Add more actions here if needed */}
          <button onClick={()=>{
            setOpenDeleteConfirmation(true) 
            setDeleteSubCategory(row.original)
          }} className='p-2 rounded-full bg-red-100 hover:bg-red-400 transition-colors'>
            <MdOutlineDeleteForever size={20}  />
          </button>
          </div>
        )
      }
        })
  ]

    const handleDeleteSubCategory = async ()=>{
    try {
      const response =  await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      })
      const { data: responseData } = response;
      if(responseData.success){
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmation(false);
        setDeleteSubCategory({
          _id: "",
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
      <section className=''>
      <div className='p-4 top- bg-white shadow-md flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Sub Categories</h1>
        <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-100 px-3 p-1 rounded'>Add sub category</button>
      </div>

        <div className=' overflow-auto w-full max-w-[95vw]'>
          <DisplayTable data={data} column={column}/>
        </div>

      {
        openAddSubCategory &&(
          <UploadSubCategoriesModle
            close={() => setOpenAddSubCategory(false)}
            fetchData={fetchSubCategory}
            
          />
        )
      }



      {
        ImageUrl &&
        <ViewImage url={ImageUrl} close={()=>setImageUrl("")}/>
      }


      {
        openEditSubCategory &&
        <EditSubCategory 
        data={editData}
         close={()=>setOpenEditSubCategory(false)}
         fetchData={fetchSubCategory}
         />
      }

      {
        openDeleteConfirmation &&(
          <ConfirmBox 
          cancel={()=>setOpenDeleteConfirmation(false)}
          close={()=>setOpenDeleteConfirmation(false)}
          confirm={handleDeleteSubCategory }
          />
        )

      }
      </section>
  )
}

export default SubCategoryPage