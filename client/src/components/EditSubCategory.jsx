import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummarApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useEffect } from "react";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });

  useEffect(() => {
    setSubCategoryData({
      _id: data._id,
      name: data.name,
      image: data.image,
      category: data.category || [],
    });
  }, [data]);

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((preve) => {
      return {
        ...preve,

        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file);
    // const { data : ImageResponse } = response
    const ImageResponse = response;
    if (!ImageResponse.success) {
      toast.error(ImageResponse.message);
      return;
    }

    setSubCategoryData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      console.log("responseData", responseData);
      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  console.log("subCategoryData page", subCategoryData);
  // Function to handle removing a selected category
  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData((prev) => {
      const updatedCategory = prev.category.filter(
        (cat) => cat._id !== categoryId
      );
      return {
        ...prev,
        category: updatedCategory,
      };
    });
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name || ""}
              onChange={handleChange}
              placeholder="Enter Sub Category Name"
              type="text"
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded "
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                {!subCategoryData.image ? (
                  <p className="text-sm text-neutral-400">No Image</p>
                ) : (
                  <img
                    alt="subCategory"
                    src={subCategoryData.image}
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div className="px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer  ">
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>
          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/*display value**/}
              <div className="flex flex-wrap gap-2">
                {subCategoryData?.category?.map((category, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white text-primary-200 px-2 py-1 rounded flex items-center gap-2"
                    >
                      <span>{category?.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveCategorySelected(category?._id)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
                {/* {
                                    subCategoryData.category.map((cat,index)=>{
                                        return(
                                            <div key={cat._id+"selectedCategory"} className='flex items-center gap-2 bg-primary-100 text-primary-200 px-2 py-1 rounded'>
                                                <span>{cat.name}</span>
                                                <button 
                                                    type='submit'
                                                    onClick={()=>handleRemoveCategorySelected(cat._id)}
                                                    className='text-red-500 hover:text-red-700'
                                                >
                                                    <IoClose size={20}/>
                                                </button>
                                            </div>
                                        )
                                    })
                                } */}
              </div>

              {/*select category**/}
              <select
                className="w-full p-2 bg-transparent outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );

                  setSubCategoryData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory?.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category?._id + "subcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`px-4 py-2 border
                            ${
                              subCategoryData?.name &&
                              subCategoryData?.image &&
                              subCategoryData?.category[0]
                                ? "bg-primary-200 hover:bg-primary-100"
                                : "bg-gray-200"
                            }    
                            font-semibold
                        `}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
