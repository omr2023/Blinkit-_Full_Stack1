import React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divder from "./Divder";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummarApi";
import { logout } from "../store/counterSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import isAdmin from "../utils/isAdmin";
const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }

        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigete("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile} <span className="text-medium text-red-400">{user.role === "ADMIN" ? "(Admin)" : ""}</span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className=" hover:text-primary-100"
        >
          <HiOutlineExternalLink />
        </Link>
      </div>

      <Divder />
      <div className="text-sm grid gap-1 ">

        { isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 hover:bg-orange-200 py-1"
          >
            Category
          </Link>
        )}

        {
        isAdmin(user.role) && (
          <Link onClick={handleClose}  to={"/dashboard/subcategory"} className="px-2 hover:bg-orange-200 py-1">Sub Category</Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 hover:bg-orange-200 py-1"
          >
            Uplode Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 hover:bg-orange-200 py-1"
          >
            Product
          </Link>
        )}
     

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1 "
        >
          Seve Address
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
