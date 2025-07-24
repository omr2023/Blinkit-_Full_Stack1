import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummarApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Divder from "../components/Divder";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png"; // Assuming you have a third image, otherwise remove this import
import { priceWithDiscount } from "../utils/pricewithDiscount";
import { formatPrice } from "../utils/FrmatPrice";
import AddToCartButton from "../components/AddToCartButton";
const ProductDisplayPage = () => {
  const parmas = useParams();
  let productId = parmas?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
        // setImage(responseData.data.image[0]);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [parmas]);

  const handleScrollRight = () => {
    if (imageContainer.current) {
      imageContainer.current.scrollLeft += 100; // Adjust the scroll amount as needed
    }
  };

  const handleScrollLeft = () => {
    if (imageContainer.current) {
      imageContainer.current.scrollLeft -= 100; // Adjust the scroll amount as needed
    }
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
      <div className="">
        <div className="bg-white  lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
          <img
            src={data.image[image]}
            alt=""
            className="w-full h-full object-scale-down"
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((img, index) => {
            return (
              <div
                key={image + index + "point"}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full cursor-pointer ${
                  index === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex gap-4 w-full z-10 relative overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className="w-20 h-20 min-h-20 min-w-20 src rounded cursor-pointer shadow-md mt-1"
                  key={index}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-scale-down rounded"
                    onClick={() => setImage(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full -ml-3 h-full flex justify-between items-center absolute ">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white rounded-full relative p-2 shadow-md hover:bg-slate-100 transition-all duration-300"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white rounded-full relative  p-2 shadow-md hover:bg-slate-100 transition-all duration-300"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="my-4 lg:grid gap-2 ">
          <div className="">
            <p className="font-semibold">Discription</p>
            <p className="text-gray-600 text-sm mt-2">
              {data.description || "No description available."}
            </p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            {data.unit ? (
              <p className="text-gray-600 text-sm mt-2">{data.unit}</p>
            ) : (
              <p className="text-gray-600 text-sm mt-2">No unit specified</p>
            )}
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div key={index}>
                  <p className="font-semibold">{element}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    {data?.more_details[element]}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="p-4 lg:pl-7">
        <p className="bg-green-300 w-fit px-3 rounded-full mb-2">10 min</p>
        <h2 className=" text-lg uppercase font-semibold lg:text-3xl">
          {data.name}
        </h2>
        <p className="bg-green-300 w-fit px-2 rounded-full mt-3 mb-3">
          {" "}
          {data.unit}
        </p>
        <Divder />
        <div className="flex flex-col gap-1">
          <p className=" font-semibold text-xl">Price</p>
          {data.discount && (
            <div className="flex items-center gap-2 mt-2">
              <p className="text-lg font-semibold line-through text-gray-500">
                {formatPrice(data.price)}
              </p>
              <p className="text-sm text-green-600 bg-green-100 px-2 py-2  rounded-full">
                {data.discount}% off
              </p>
            </div>
          )}
          <div>
            <div className="border border-green-300 p-2 rounded-lg mt-2 bg-green-50 w-fit">
              {data?.price ? (
                <p className="text-2xl font-semibold">
                  {/* {priceWithDiscount(data.price, data.discount)} */}
                  {formatPrice(priceWithDiscount(data.price, data.discount))}
                </p>
              ) : (
                <p className="text-2xl font-semibold">Not Available</p>
              )}
            </div>
          </div>
        </div>
        {data.stock === 0 ? (
          <p className="text-red-500 mt-2 my-2">Out of Stock</p>
        ) : (
          <button className="mt-3">
            {/* <div className="bg-green-300 w-fit px-3 py-2 rounded-full mt-4 hover:bg-green-400 transition-all duration-300">
                  <p className="text-white font-semibold">Add to Cart</p>
                </div> */}
            <AddToCartButton data={data} />
          </button>
        )}

        <h2 className="font-medium mt-2">Why shop from bbinkeyit?</h2>
        <div>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={image1}
              alt=""
              className="w-20 h-20 object-cover rounded-full mt-2"
            />
            <div>
              <p className="text-lg font-semibold">Minute Delivery</p>
              <p className="text-sm text-gray-600">
                Get your products delivered in minutes.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={image2}
              alt=""
              className="w-20 h-20 object-cover rounded-full mt-2"
            />
            <div>
              <p className="text-lg font-semibold">Best Prices & Offers</p>
              <p className="text-sm text-gray-600">
                Enjoy the best prices and exclusive offers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={image3}
              alt=""
              className="w-20 h-20 object-cover rounded-full mt-2"
            />
            <div>
              <p className="text-lg font-semibold">Wide Assortment</p>
              <p className="text-sm text-gray-600">
                Explore a wide range of products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
