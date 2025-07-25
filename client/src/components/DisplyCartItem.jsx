import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, Links, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { formatPrice } from "../utils/FrmatPrice";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { priceWithDiscount } from "../utils/pricewithDiscount";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";
const DisplyCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Please Login");
  };
  console.log("users", user);

  return (
    <section className="bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between ">
          <h2 className="font-semibold text-2xl">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[80vh] lg:min-h-[78vh] h-full  max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4 ">
          {/* display items */}
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 gap-3 text-blue-500 rounded-full text-center">
                <p> Your total Savings</p>
                {/* <p>{formatPrice(notDiscountTotalPrice -  totalPrice)}</p> */}
                <p>
                  {formatPrice(Math.abs(notDiscountTotalPrice - totalPrice))}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 grid gap-6 overflow-auto">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={item?._id + "cartItemDesply" + index}
                        className="flex w-full gap-4"
                      >
                        <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            className=" object-scale-down"
                            alt=""
                          />
                        </div>
                        <div className="w-full max-w-sm ">
                          <p className="text-xs  text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-xs">{item?.productId?.unit}</p>
                          <p className="text-xs">
                            {formatPrice(
                              priceWithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton
                            data={item?.productId}
                            key={index}
                            className=""
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill details</h3>

                <div className="flex items-center justify-between gap-4">
                  <p>Items total</p>
                  <p className=" line-through">
                    {formatPrice(-notDiscountTotalPrice)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p>Quantity total</p>
                  <p>{totalQty} item</p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p>Total Price</p>
                  <p className="text-green-600 font-bold">${totalPrice}</p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p>Delivery Charge</p>
                  <p className=" font-bold text-gray-400">Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between">
                  <p>Garnd total</p>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center">
              <img
                src={imageEmpty}
                alt=""
                className=" w-full h-full object-scale-down p-2"
              />
              <Link
                onClick={close}
                to={"/"}
                className="border text-blue-400 rounded shadow p-2"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-600 text-neutral-100 px-4 font-semibold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{formatPrice(totalPrice)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1"
              >
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplyCartItem;
