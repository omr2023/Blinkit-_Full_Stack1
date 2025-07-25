import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummarApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEidit, setOpenEidit] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState({
    name: "",
    image: "",
  });

  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

  const [deleteCategoryData, setDeleteCategoryData] = useState({
    _id: "",
  });

  // const allCategory = useSelector(state => state.product.allCategory)
  // useEffect(()=>{
  //   setCategoryData(allCategory)-
  // },[allCategory])

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      // const responseData = response.data;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: {
          _id: deleteCategoryData,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success("Category deleted successfully");
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error, "Failed to delete category");
    }
  };
  // console.log("categoryData", categoryData);

  return (
    <section>
      <div className="p-4 top- bg-white shadow-md flex items-center justify-between">
        <h2 className=" font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-100 px-3 p-1 rounded"
        >
          Add category
        </button>
      </div>

      {!categoryData[0] && !isLoading && <NoData />}
      <div className=" p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {
          // eslint-disable-next-line no-unused-vars
          categoryData.map((category, index) => {
            return (
              <div
                key={category._id}
                className=" w-32 h-50 group object-scale-down shadow-md rounded  "
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full object-scale-down rounded "
                />
                <div className=" items-center justify-between h-9 flex p-2 gap-3">
                  <button
                    onClick={() => {
                      setOpenEidit(true);
                      setEditCategoryData(category);
                      // You can also pass the category data to the edit modal if needed
                    }}
                    className=" flex-1 bg-green-100 text-green-500 hover:bg-green-200 px-1 rounded font-medium py-1 transition-all duration-200"
                  >
                    Eidit
                  </button>
                  <button
                    onClick={() => {
                      setOpenConfirmBoxDelete(true);
                      setDeleteCategoryData(category);
                    }}
                    className="ml-2 flex-1 bg-red-200 text-red-500 hover:bg-red-300 px-1 rounded font-medium py-1 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
      {isLoading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEidit && (
        <EditCategory
          data={editCategoryData}
          fetchData={fetchCategory}
          close={() => setOpenEidit(false)}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
