import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummarApi.js";
import  toast from "react-hot-toast";
import uploadImage from "../utils/UploadImage";
import AxiosToastError from "../utils/AxiosToastError"
const UploadCategoryModel = ({ close , fetchData}) => {
  const [data , setData] = useState({
    name: "",
    image: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: {
          name: data.name,
          image: data.image,
          
        },
      })
      const { data: responseData } = response;
      if(responseData.success){
        toast.success("Category added successfully");
        setData({
          name: "",
          image: "",
        });
        close();
        fetchData();
      }
      setIsLoading(true);
    } catch (error) {
      AxiosToastError(error); 
    }finally{
      setIsLoading(false);
    }
  };


  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file)
    // const { data: ImageResponse } = response;
      const ImageResponse = response;
      if(!ImageResponse?.data?.url){
        console.error("Image response is not valid", ImageResponse);
      }

    setData((preve) =>{
      return {
        ...preve,
        image: ImageResponse.data.url
      };
    })
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>
        <form action="" className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName" htmlFor="">
              Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Category Name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border outline-none border-blue-100 focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-2">
            <p>Image</p>
            <div className="flex gap-5 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">

                {
                  data.image ? (
                    <img 
                    src={data.image}
                    alt="category" 
                    className="h-full w-full object-scale-down"
                    />
                  ):(
                    <span className="text-sm text-neutral-500">No Image</span>
                  )
                }
                {/* {
                    data.image ? (
                        <img
                        src={data.image}
                        alt="Category"
                        className="h-full w-full object-scale-down"
                        loading="lazy"
                        />
                    ) : (

                    )
                } */}
              </div>
              <label htmlFor="uploadCategoryImage" className="cursor-pointer">
                <div
                  className={`
                                ${!data.name ? "bg-gray-400" : "bg-primary-100"}
                                px-4 py-1 rounded cursor-pointer
                                `}
                >
                  Upload Image
                </div>
                <input
                disabled={!data.name}
                  type="file"
                  name="image"
                  id="uploadCategoryImage"
                  className=" hidden"
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>
                 <button
                    className={`
                    ${data.name && data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "}
                    py-2    
                    font-semibold 
                    `}
                >Add Category</button>

        </form>

      </div>
    </section>
   );
};

export default UploadCategoryModel;


