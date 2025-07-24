import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummarApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updtateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailAbleCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetailse, setCartItemDetaillse] = useState({});

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
    console.log("Add to cart clicked", data._id);
  };

  // checking this item in cart or not
  useEffect(() => {
    const checkingitem = cartItem.some(
      (item) => item?.productId?._id === data?._id
    );
    setIsAvailAbleCart(checkingitem);
    const product = cartItem.find((item) => item?.productId?._id === data?._id);
    setQty(product?.quantity);
    setCartItemDetaillse(product);
    console.log("product", product);
  }, [data, cartItem]);

  const increaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await updtateCartItem(cartItemDetailse?._id,qty+1);
      if(response.success){
        toast.success("Item added")
      }
  };

  const decreaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemDetailse?._id);
    } else {
      const response = await updtateCartItem(cartItemDetailse?._id, qty - 1);
            if(response.success){
        toast.success("delete Item Produact")
      }
    }
  };
  return (
    <div className="w-full max-w-[150px]">
      {isAvailableCart ? (
        <div className="flex items-center gap-3 w-fit border p-2">
          <button
            onClick={decreaseQty}
            className="bg-red-500 hover:bg-red-600 text-white flex-1 rounded-full  transition-all w-full"
          >
            <FaMinus />
          </button>
          <p className="flex-1 w-full font-semibold">{qty}</p>
          <button
            onClick={increaseQty}
            className="bg-green-500 hover:bg-green-600 text-white flex-1 rounded-full transition-all w-full"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
