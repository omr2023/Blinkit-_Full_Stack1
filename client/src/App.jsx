/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/counterSlice";
import {
  setAllCategorie,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/ProductSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummarApi";
import { handleAddItemCart } from "./store/cartProduct";
import GlobalProvider from "./provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from "./components/CartMobileLink";
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  

  const fetchUser = async () => {
    const userData = await fetchUserDetails();

    dispatch(setUserDetails(userData.data));
  };

  const fetchCatregory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      // const responseData = response.data;
      if (responseData.success) {
        dispatch(setAllCategorie(responseData.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      // const responseData = response.data;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }

      // .sort((a , b )=>a.name.localeCompare(b.name)))
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      // dispatch(setLoadingCategory(false))
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCatregory();
    fetchSubCategory();
    //fetchCartItem()
  }, []);

  
    
  return (
    <GlobalProvider>
      <Header />
      <div className="min-h-[78vh]">
        <h1 className="">
          <Outlet />
        </h1>
      </div>
      <Footer />
      <Toaster />
        {
          location.pathname === '/checkout' && (
          <CartMobileLink />
          )
        }
    </GlobalProvider>
  );
};

export default App;
