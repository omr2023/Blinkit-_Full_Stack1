import React, { useState } from "react";
import { formatPrice } from "../utils/FrmatPrice";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummarApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
const CheckoutPage = () => {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrders,
  } = useGlobalContext();
  const [openAdress, setOpenAdress] = useState(false);
  const addressList = useSelector((state) => state.address.addressList);
  const [selectAdderss, setSelecAdderss] = useState(0);
  const cartItemsList = useSelector((state) => state.cartItem?.cart);
  const navigate = useNavigate();

  const handlecashOneDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrderController,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAdderss]?._id,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
        if (fetchOrders) {
          fetchOrders();
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading...");
      const stripepublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

      const stripePromise = await loadStripe(stripepublicKey);
      const response = await Axios({
        ...SummaryApi.paymenit_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAdderss]?._id,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="bg-blue-50 ">
      <div className=" container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        <div className="w-full">
          {/* address */}
          <h3 className="text-lg font-semibold bottom-3">
            Choose Your address
          </h3>
          <div className="bg-white p-2 grid  gap-4">
            {addressList.flat().map((address, index) => {
              return (
                <label
                  key={index}
                  htmlFor={"address" + index}
                  className={`!address.status && "hidden"`}
                >
                  <div className="border rounded p-3 flex gap-4 hover:bg-blue-50">
                    <div>
                      <input
                        type="radio"
                        name="address"
                        value={index}
                        onChange={(e) => setSelecAdderss(e.target.value)}
                        id={"adress+" + index}
                      />
                    </div>
                    <div>
                      <p>{address.aaddress_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>
                        {address.country} - {address.pincode}{" "}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          <div
            onClick={() => setOpenAdress(true)}
            className="h-16  bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
          >
            Add address
          </div>
        </div>

        <div className="w-full max-w-md  bg-white rounded py-4 px-2">
          {/**summary**/}
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {formatPrice(notDiscountTotalPrice)}
                </span>
                <span>{formatPrice(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Quntity total</p>
              <p className="flex items-center gap-2">{totalQty} item</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={handleOnlinePayment}
              className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold w-fit"
            >
              Online Payment
            </button>

            <button
              onClick={handlecashOneDelivery}
              className="py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAdress && <AddAddress close={() => setOpenAdress(false)} />}
    </section>
  );
};

export default CheckoutPage;
