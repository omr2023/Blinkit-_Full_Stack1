import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { formatPrice } from "../utils/FrmatPrice";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2">
          <div className="bg-green-600 px-2 py-1 flex items-center justify-between gap-1 rounded text-sm lg:hidden text-neutral-100 ">
            <div className="flex items-center gap-4">
              <div className="bg-green-500 p-2 rounded w-fit">
                <FaCartShopping size={30} />
              </div>
              <div className="flex items-center gap-3 text-sm">
                <p>{totalQty} items</p>
                <p>{formatPrice(totalPrice)}</p>
              </div>
            </div>

            <Link to={"/cart"} className="flex items-center gap-1">
              <span className="text-sm">view Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
