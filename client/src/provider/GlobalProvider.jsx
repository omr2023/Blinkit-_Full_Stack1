/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import SummaryApi from "../common/SummarApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { handleAddAddress } from "../store/addressSlice";
import { setOrders } from "../store/orderSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);
  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updtateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        // toast.success(responseData.message)
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    const qty = cartItem.reduce((preve, curr) => {
      const quantity = Number(curr.quantity);
      return preve + (isNaN(quantity) ? 0 : quantity);
    }, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((preve, curr) => {
      if (
        curr.productId &&
        curr.productId.price != null &&
        curr.quantity != null
      ) {
        return preve + curr.productId.price * curr.quantity;
      }
      return preve;
    }, 0);
    setTotalPrice(tPrice);

    const NotDiscountPrice = cartItem.reduce((preve, curr) => {
      const quantity = Number(curr.quantity);
      return preve + (isNaN(quantity) ? 0 : quantity);
    }, 0);
    setNotDiscountTotalPrice(NotDiscountPrice);

    const tPrices = cartItem.reduce((preve, curr) => {
      if (
        curr.productId &&
        curr.productId.price != null &&
        curr.quantity != null
      ) {
        return preve + curr.productId.price * curr.quantity;
      }
      return preve;
    }, 0);
    setTotalPrice(tPrices);
  }, [cartItem]);

  const handleLogOut = async () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  const fetchAddaddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAdderss,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.GetOrderList,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setOrders(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
    handleLogOut();
    fetchAddaddress();
    fetchOrders();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updtateCartItem,
        deleteCartItem,
        fetchAddaddress,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        fetchOrders,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
