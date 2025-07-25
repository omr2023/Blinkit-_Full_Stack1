import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { formatPrice } from "../utils/FrmatPrice";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplyCartItem from "./DisplyCartItem";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";
  const navigete = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMeun, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => {
    navigete("/login");
  };

  const handleCloseUserMeune = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigete("/login");
      return;
    }

    navigete("/user");
  };

  //total item and total price

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
    console.log("price", tPrice);
    setTotalPrice(tPrice);
  }, [cartItem]);

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex  flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className=" container mx-auto flex items-center px-2 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className=" hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className=" lg:hidden"
              />
            </Link>
          </div>
          {/* search */}
          <div className=" hidden lg:block">
            <Search />
          </div>

          {/* login and my cart */}
          <div className="">
            {/* user icons disply in only mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegUserCircle size={30} />
            </button>
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className=" relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex select-none items-center gap-1 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMeun ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMeun && (
                    <div className=" absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMeune} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg font-semibold cursor-pointer"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 py-2 px-3 rounded text-white"
              >
                {/* add to cart icons */}
                <div className=" animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div>
                  {cartItem[0] ? (
                    <div>
                      <p className="">{totalQty} Items</p>
                      <p>{formatPrice(totalPrice)}</p>
                    </div>
                  ) : (
                    <p className=" font-semibold text-sm">My Cart</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=" container mx-auto px-2 lg:hidden">
        <Search />
      </div>

      {openCartSection && (
        <DisplyCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;
