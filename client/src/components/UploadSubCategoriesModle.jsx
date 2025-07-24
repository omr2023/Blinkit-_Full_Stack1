import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummarApi'
import toast from 'react-hot-toast';
import AxiosToastError from "../utils/AxiosToastError"
const UploadSubCategoriesModle = ({close ,fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: '',
    image: '',
    category: []
  })


const allCategorie = useSelector(state => state.product.allCategorie)


  

  const handleChange = (e) => {

    const { name, value } = e.target;
    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handlUploadSubCategoryImage = async(e) => {
     const file = e.target.files[0];

      if (!file) {
        return;
      }

    const response = await uploadImage(file)
      const ImageResponse = response;
      if(!ImageResponse?.data?.url){
        console.error("Image response is not valid", ImageResponse);
      }

    setSubCategoryData((preve) =>{
      return {
        ...preve,
        image: ImageResponse.data.url
      };
    })
  }
  
const  handleRemoveCategorySelected = (categoryId)=>{
  const index = subCategoryData.category.findIndex(el => el._id === categoryId);

  subCategoryData.category.splice(index, 1);

  setSubCategoryData((preve)=>{
    return{
      ...preve,
      category: [...subCategoryData.category]
    }
  })
}

const handleSubmitSubCategory = async(e) =>{
        e.preventDefault()
  try {
    const response = await Axios({
      ...SummaryApi.addSubCategory,
      data : subCategoryData
    })

    const {data : responseData } = response
    console.log("responseData" ,responseData);
    
    if(responseData.success){
      toast.success(responseData.message)

      if(close){
        close()
      }
      if(fetchData){
        fetchData()
      }
    }
  } catch (error) {
    AxiosToastError(error)
  }
}


  
  return (
    <section className='fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center'>
      <div className='w-full max-w-6xl bg-white p-4 rounded'>
            <div className='flex items-center justify-between gap-3 mb-4'>
              <h1 className='text-lg font-semibold'>Add Sub Category</h1>
              <button onClick={close} className='p-1 rounded hover:bg-gray-100 hover:text-red-400 transition-colors'>
                <IoClose size={25} className='text-gray-500 hover:text-red-500' />
              </button>
            </div>
            <form action="" className='my-3 grid gap-3 ' onSubmit={handleSubmitSubCategory}>
                <div className='grid gap-2'>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-700'>Sub Category Name</label>
                <input id='name' name='name'value={subCategoryData.name} onChange={handleChange} type="text" className='w-full p-2  border border-gray-300 rounded outline-none focus-within:border-primary-200' placeholder='Enter sub category name' />
              </div>
              <div className='grid gap-2'>
                  <p>Image</p>
                  <div className='flex flex-col lg:flex-row items-center gap-3'>
                    <div className='border w-full h-36 lg:w-36 bg-blue-50 flex items-center justify-center'>
                  {
                    !subCategoryData.image ? (
                      <p className='text-sm text-neutral-400'>No Image</p>
                    ) : (
                    <img 
                    src={subCategoryData.image}
                    alt="subCategory" 
                    className="h-full w-full object-scale-down"
                    />
                    )
                  }
                  </div>
                  <label htmlFor="uploadSubCategoryImage">
                   <div className='px-4  py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer'>
                    UploadImage
                   </div>
                   <input 
                   type="file"
                    id='uploadSubCategoryImage'
                    className='hidden'
                    onChange={handlUploadSubCategoryImage}
                    />
                  </label>
                  </div>
              </div>
                    <div className='grid gap-1'>
              <label htmlFor='category' className='block mb-2 text-sm font-medium text-gray-700'>Select Category</label>
                        </div>
              <div className='border p-2 rounded focus-within:border-primary-200'>
                  {/* display value */}
                  <div className='flex flex-wrap gap-2'>
                      {
                    subCategoryData.category.map((cat , index) => {
                      return (
                        // <p key={cat._id+"selactdValue"} className='bg-white '>{ cat.name}</p>
                        <p key={cat._id+"selactdValue"} className='bg-yellow-50 m-2 shadow-md text-primary-900 px-2 py-1 rounded flex items-center justify-between gap-2'>
                          {cat.name}
                          <div onClick={()=>handleRemoveCategorySelected()} className='cursor-pointer hover:bg-red-100 rounded-full p-1'>
                            <IoClose  size={20} />
                          </div>
                          </p>
                      )
                    })
                  }
                  </div>
                  {/* selact Category */}
                <select
                onChange={(e)=>{
                  const value = e.target.value;

                  const categoryIndex = allCategorie.find(el => el._id == value);

                  setSubCategoryData((prev)=>{
                    return {
                      ...prev,
                      category: [...prev.category, categoryIndex]
                    }
                  })
                }}
                className='w-full p-2 outline-none bg-transparent border '
                > 
                  <option value={""}>Select Category</option>
                  {
                    allCategorie.map((category , index)=>{
                      return(
                        <option value={category?._id} key={category?._id+"SubCategory"}>{category?.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <button
              className={`px-4 p-2 border 
                ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-400" }
                `}
              >
                Submit
              </button>
            </form>
      </div>
    </section>
  )
}

export default UploadSubCategoriesModle