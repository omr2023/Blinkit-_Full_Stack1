    import React, { useEffect, useRef, useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import AxiosToastError from "../utils/AxiosToastError";
    import Axios from "../utils/Axios";
    import SummaryApi from "../common/SummarApi";
    import CartLoading from "./CartLoading";
    import CaardProduct from "./CaardProduct";
    import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
    const CategorywiseProuctDisplay = ({ id, name }) => {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);
    const containerRef = useRef();
    const subcategoryData = useSelector(state => state.product.allsubCategory)
    const navigate = useNavigate()
    const loadingCardNumabr = new Array(6).fill(null);

    const fetchCategorwiseProduct = async () => {
        try {
        setloading(true);
        const response = await Axios({
            ...SummaryApi.getProductByCategory,
            data: {
            id: id,
            }
        });

        const { data: responseData } = response;
        if (responseData.success) {
            setData(responseData.data);
        }
        console.log(responseData);
        } catch (error) {
        AxiosToastError(error);
        } finally {
        setloading(false);
        }
    };

    useEffect(() => {
        fetchCategorwiseProduct();
    }, []);

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200;
    };

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200;
    };








    const handleRedirectProductListpage = ()=>{
      console.log(id , name);
      const subcategory = subcategoryData.find(sub =>{
        const filterData =  sub.category.some(e =>{
          return e._id == id
        })

        return filterData ? true : null
      })
      const  url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
             navigate(url)
            
        }
    return (
        <div>
        <div className="container mx-auto p-4 flex items-center justify-between gap-4 ">
            <h3 className=" font-semibold text-lg md:text-xl">{name}</h3>
            <Link onClick={handleRedirectProductListpage} to="" className="text-green-600 hover:text-green-400">
            See All
            </Link>
        </div>
        <div className=" relative  flex items-center">
            <div
            className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
            ref={containerRef}
            >
            {loading &&
                loadingCardNumabr.map((_, index) => {
                return (
                    <CartLoading key={"CategorywiseProductDasolay123" + index} />
                );
                })}
            {data.map((p, index) => {
                return (
                <CaardProduct
                    data={p}
                    key={p._id + "CategorywiseProductDasolay" + index}
                />
                );
            })}
            </div>

            <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden  lg:flex justify-between">
            <button
                onClick={handleScrollLeft}
                className="z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full text-lg"
            >
                <FaAngleLeft />
            </button>
            <button
                onClick={handleScrollRight}
                className="z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full text-lg"
            >
                <FaAngleRight />
            </button>
            </div>
        </div>
        </div>
    );
    };

export default CategorywiseProuctDisplay;
