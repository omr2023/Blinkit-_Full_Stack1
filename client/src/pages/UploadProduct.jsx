import React, { useState , useEffect } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import {MdDelete} from "react-icons/md"
import {useSelector} from 'react-redux'
import { IoClose } from 'react-icons/io5';
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummarApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
const UploadProduct = () => {
  const [data , setData]= useState({
    name : "",
    image : [],
    category: [],
    subCategory : [],
    unit : '',
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
  })

  const [imageloading , setImageLoading] =useState(false)

  const [viewImageURL , setViewImageURL] = useState("")

  const allCategorie = useSelector(state => state.product.allCategorie)

  const [selectCategory , setSelectCategory] = useState("")

  const [selectSubCategory , setselectSubCategory] = useState("")

  const allSubCategory = useSelector(state => state.product.allsubCategory)

  // const [moreFieeld , setMoreField] = useState([])

  const [openAddField , setOpenAddField] = useState(false)

  const [filedName , setFiledName] =useState("")

const handleChange = (e)=>{

  const {name , value} =e.target
  setData((preve)=>{
    return{
      ...preve,
      [name] : value
    }
  })
}



const handleUploadImage = async(e)=>{
  const file = e.target.files[0]
  if(!file){
    return
  }

setImageLoading(true)
  const response = await uploadImage(file)
  const { data: ImageResponse } = response

  const imageUrl = ImageResponse.url || ImageResponse.data?.url
  if (imageUrl) {
    setData((preve)=>{
      return{
        ...preve,
        image : [...preve.image, imageUrl]
      }
    })

  }
  setImageLoading(false)
}


const handleDeleteImage = async(index)=>{
  data.image.splice(index,1)
  setData((preve)=>{
    return{
        ...preve
    }
  })
}


const handleRemovCategory = async(index) => {
  data.category.splice(index,1)
  setData((preve)=>{
    return{
      ...preve
    }
  })
}

const handleRemovSubCategory = async(index) =>{
    data.subCategory.splice(index,1)
  setData((preve)=>{
    return{
      ...preve
    }
  })
}

    const handleAddField = () =>{
      setData((preve)=>{
        return{
          ...preve,
          more_details : {
            ...preve.more_details,
            [filedName] : ""
          }
        }
      })
      setFiledName("")
      setOpenAddField(false)
    }

    const handleSubmit = async(e)=>{
       e.preventDefault()
      console.log("data" , data);
      
      try {
        const response = await Axios({
          ...SummaryApi.createProduct,
          data : data
        })
        const {data : responseData} = response
        if(responseData.success){
          successAlert(responseData.message)
          setData({
                name : "",
    image : [],
    category: [],
    subCategory : [],
    unit : '',
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
          })
        }
      } catch (error) {
        AxiosToastError(error)
      }
    }
    // useEffect(()=>{
    //   successAlert("Uplod successfully")
    // },[])
  return (
      <section className=''>
      <div className='p-4  bg-white shadow-md flex items-center justify-between'>
        <h2 className=' font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
      <form  className='grid gap-2' onSubmit={handleSubmit}>
        <div className=' grid gap-1'>
          <label htmlFor="name"className='font-semibold' >Name</label>
          <input 
          type="text"
          id='name'
          placeholder='Enter prodect name'
          name='name'
          value={data.name}
          onChange={handleChange}
          required
          className=' bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          />
        </div>

          <div className=' grid gap-1'>
          <label htmlFor="description" className='font-semibold'>Descripion</label>
          <textarea 
          type="text"
          id='description'
          placeholder='Enter prodect description'
          name='description'
          value={data.description}
          onChange={handleChange}
          required
          multiple
          rows={3}
          className=' bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
          />
        </div>

          <div>
            <p>Image</p>
        <div>
            <label htmlFor='productImage' className='bg-neutral-100 border h-24 rounded flex items-center justify-center cursor-pointer'>
                  <div className=' text-center flex justify-center flex-col items-center'>
                    {
                      imageloading ?< Loading/> : (
                        <>
                        
                        <FaCloudUploadAlt size={35}/>
                        <p>Upload Image</p>
                        </>
                      ) 
                    }
                  </div>
                    <input 
                    type="file" 
                    id='productImage'
                    className=' hidden'
                    accept='image/*'
                    onChange={handleUploadImage}
                    />

            </label>
            {/* display uploade image */}
              <div className=' flex flex-wrap gap-4'>
                    {
                      data.image.map((img , index)=>{
                        return(
                          <div key={img + index} className=' h-20 w-20 mt-2 min-w-20 bg-blue-50 border relative group'>
                            <img 
                            src={img}
                            alt={img}
                            className='w-full h-full object-scale-down cursor-pointer'
                            onClick={()=>setViewImageURL(img)}
                            />
                            <div onClick={()=>handleDeleteImage(index)} className=' absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-400 rounded cursor-pointer text-white hidden group-hover:block'>
                              <MdDelete />
                            </div>
                          </div>
                        )
                      })
                    }
              </div>
        </div>
          </div>

              <div className='grid gap-1'>
                  <label className='font-semibold' >Category</label>
                  <div>
                    <select
                      className='bg-blue-50 border w-full p-2 rounded outline-none'
                      value={selectCategory}
                      onChange={(e)=>{
                        const value = e.target.value 
                        const category = allCategorie.find(el => el._id === value )
                        
                        setData((preve)=>{
                          return{
                            ...preve,
                            category : [...preve.category,category],
                          }
                        })
                        setSelectCategory("")
                      }}
                    >
                      <option value={""}>Select Category</option>
                      {
                        allCategorie.map((c,index)=>{
                          return(
                            <option key={c._id} value={c?._id}>{c.name}</option>
                          )
                        })
                      }
                    </select>
                    <div className='flex flex-wrap gap-3'>
                      {
                        data.category.map((c,index)=>{
                          return(
                            <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                              <p>{c.name}</p>
                              <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemovCategory(index)}>
                                <IoClose size={20}/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>

          <div className='grid gap1'>
            <label htmlFor="" className='font-semibold' >Sub Category</label>
              <div>
              <select 
              value={selectSubCategory}
              onChange={(e)=>{
                const value = e.target.value
                const subCategory = allSubCategory.find(el => el._id ===value)

                setData((preve)=>{
                  return{
                    ...preve,
                    subCategory : [...preve.subCategory,subCategory]
                  }
                })
                setselectSubCategory("")
              }}
              className='bg-blue-50 border w-full p-2 rounded outline-none'
              >
              <option value={""} className='text-neutral-500'>
                Select Sub Category
              </option>
              {
                allSubCategory.map((c , index)=>{
                  return(
                    <option  value={c?._id}>{c.name}</option>
                  )
                })
              }
            </select>

                  <div className='flex flex-wrap gap-3'>
                  {
                  data.subCategory.map((c,index)=>{
                    return(
                      <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-2 border p-1 bg-blue-50 mt-2'>
                        <p className=''>{c.name}</p>
                        <div onClick={()=>handleRemovSubCategory(index)} className='bg-red-700 hover:bg-red-600 rounded-full transition-shadow text-white text-sm cursor-pointer'>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
                  </div>
              </div>
          </div>


          <div className=' grid gap-1'>
          <label htmlFor="unit" className='font-semibold' >Unit</label>
          <input 
          id='unit'
          type='text'
          placeholder='Enter prodect Unit'
          name='unit'
          value={data.unit} 
          onChange={handleChange}
          required
          className=' bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          />
        </div>

          <div className=' grid gap-1'>
          <label htmlFor="stock" className='font-semibold' >Number Of Stock</label>
          <input 
          id='stock'
          type='number'
          placeholder='Enter prodect Stock'
          name='stock'
          value={data.stock}
          onChange={handleChange}
          required
          className=' bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          />
        </div>


           <div className=' grid gap-1'>
          <label htmlFor="price" className='font-semibold'>Price</label>
          <input 
          id='price'
          type='number'
          placeholder='Enter prodect price'
          name='price'
          value={data.price}
          onChange={handleChange}
          required
          className=' bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          />
        </div>


          <div className=' grid gap-1'>
          <label htmlFor="discount"className='font-semibold' >Discount</label>
          <input 
          id='discount'
          type='number'
          placeholder='Enter prodect price'
          name='discount'
          value={data.discount}
          onChange={handleChange}
          required
          className=' bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
          />
        </div>
                {/* { // add more filed } */}
                <div>
                  {
                    Object?.keys(data?.more_details)?.map((k , index)=>{
                      return(
                      <div className=' grid gap-1'>
                      <label htmlFor={k}>{k}</label>
                      <input 
                      id={k}
                      type='text'
                      value={data?.more_details[k]}
                      onChange={(e)=>{
                        const value = e.target.value
                        setData((preve)=>{
                          return{
                            ...preve,
                            more_details : {
                              ...preve.more_details,
                              [k] : value
                            }
                          }
                        })
                      }}
                      required
                      className=' bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                      />
                    </div>
                      )
                    })
                  }
                </div>


                <div onClick={()=>setOpenAddField(true)} className='  bg-white hover:bg-primary-200 by-2 px-3 w-32 font-semibold cursor-pointer border rounded border-primary-200 hover:text-white text-center'>
                  Add Fields
                </div>

                <button className=' block border bg-white hover:bg-primary-200 hover:text-white rounded p-1 mt-2 font-semibold'>
                  subimt
                </button>
        </form>
      </div>
      {
        viewImageURL &&(
          <ViewImage url={viewImageURL} close={()=>setViewImageURL("")}/>
        )
      }

      {
        openAddField && (
          <AddFieldComponent 
          close={()=>setOpenAddField(false)}
          value={filedName}
          onChange={(e)=>setFiledName(e.target.value) }
          submit={handleAddField}
          />
        )
      }
      </section>
  )

}

export default UploadProduct