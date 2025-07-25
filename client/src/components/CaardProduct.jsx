import React, { useState } from "react";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import { priceWithDiscount } from "../utils/pricewithDiscount";
import SummaryApi from "../common/SummarApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
// import toast from 'react-hot-toast'
// import { useGlobalContext } from '../provider/GlobalProvider'
import { formatPrice } from "../utils/FrmatPrice";
import AddToCartButton from "./AddToCartButton";

const CaardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  return (
    <Link
      to={url}
      className="border p-4 grid gap-3 max-w-52 lg:min-w-52 rounded cursor-pointer bg-white"
    >
      <div className="min-h-20 lg:max-h-32 max-h-32 rounded ">
        <img
          src={data.image[0]}
          alt=""
          className="w-full h-full object-scale-down scale-125"
        />
      </div>
      <div className="flex items-center justify-between text-xs lg:text-sm">
        <div className="rounded-full text-sm w-fit px-2 p-[1px] text-green-600 bg-green-100">
          10 min
        </div>
        <div>
          {Boolean(data.discount) && (
            <p className="text-green-600 bg-green-100 px-2 p-1 rounded-full w-fit text-sm">
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.name}
      </div>
      <div className="w-fit">{data.unit}</div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="font-semibold">
            {/* ${priceWithDiscount(data.price, data.discount)} */}
            {formatPrice(priceWithDiscount(data.price, data.discount))}
          </div>
        </div>
        <div className="">
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CaardProduct;
