import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SummarApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const ProductCartAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProductDetails,
        data: {
          _id: data._id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchProductData) {
          fetchProductData();
        }
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="w-36 p-4 bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-scale-down"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-slate-500">{data?.unit}</p>
      <div className="grid grid-cols-2 gap-2 my-2 ">
        <button
          onClick={() => setEditOpen(true)}
          className=" border px-1 py-1 text-sm  text-green-400 hover:bg-green-200 border-green-400 hover:text-green-500"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className=" border px-1 py-1 text-sm text-red-500 hover:bg-red-300 border-red-400 hover:text-red-600"
        >
          Delete
        </button>
      </div>
      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <section className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Permanent Delete.</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose
                  size={25}
                  className="text-gray-700 hover:text-gray-900 transition-all duration-200"
                />
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleDeleteCancel}
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded mr-2 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductCartAdmin;
