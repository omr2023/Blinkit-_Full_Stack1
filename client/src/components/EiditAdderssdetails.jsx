import React, { useState } from "react";
import { addListener } from "@reduxjs/toolkit"
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummarApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const EiditAdderssdetails = ({close ,data}) => {
const { register, handleSubmit ,reset } = useForm({
            defaultValues : {
                _id : data._id,
                userId : data.userId,
            aaddress_line: data.aaddress_line ,
            city : data.city,
            state : data.state ,
            country : data.country,
            mobile : data.mobile ,
            pincode : data.Pincode,
    }
});
const {fetchAddaddress} = useGlobalContext()

const onSubmit = async(data)  => {

    try {
        const response = await Axios({
            ...SummaryApi.updateAddress,
            data : {
                ...data,
             aaddress_line: data.aaddress_line,
            city : data.city,
            state : data.state ,
            country : data.country,
            mobile : data.mobile ,
            pincode : data.Pincode,
            }
        })
        const {data : responseData } = response

        if(responseData.success){
            toast.success(responseData.message)
            if(close){
                close()
                reset()
                fetchAddaddress()
            }
        }
    } catch (error) {
        AxiosToastError(error)
    }
};
console.log(close);

return (
    <section className=" bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 h-screen overflow-auto">
        <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded">
                <div className="flex items-center justify-between">
             <h2 className="font-semibold">Edit Address</h2>
                <button onClick={ close } className='hover:text-red-500'>
                    <IoClose  size={25}/>
                </button>
                </div>
            <form onSubmit={handleSubmit(onSubmit)} action="" className="mt-4 grid gap-4">
                <div className="grid gap-2">
                    <label htmlFor="addressLin">Address Line 1 : </label>
                    <input
                        type="text"
                        id="addressLine"
                        className="border bg-blue-100 border-blue-50 p-2 outline-none"
                        {...register("aaddress_line" , {required : true})}
                    />
                </div>
                <div className="grid  gap-1">
                    <label htmlFor="state">State : </label>
                    <input
                        type="text"
                        id="state"
                        className="border bg-blue-100 border-blue-50 p-2 outline-none"
                        {...register("state" , {required : true})}
                    />
                </div>
                <div className="grid  gap-1">
                    <label htmlFor="city">City : </label>
                    <input
                        type="text"
                        id="city"
                        className="border bg-blue-100 border-blue-50 p-2 outline-none"
                        {...register("city" , {required : true})}
                    />
                </div>
                <div className="grid  gap-1">
                    <label htmlFor="Pincode">Pincode : </label>
                    <input
                        type="text"
                        id="Pincode"
                        className="border bg-blue-100 border-blue-50 p-2 outline-none"
                        {...register("Pincode" , {required : true})}
                    />
                </div>
                <div className="grid  gap-1">
                    <label htmlFor="country">Country : </label>
                    <input
                        type="text"
                        id="country"
                        className="border bg-blue-100 border-blue-50 p-2 outline-none"
                        {...register("country" , {required : true})}
                    />
                </div>
                <div className="grid  gap-1">
                    <label htmlFor="mobile">Mobile NO. : </label>
                    <input
                        type="text"
                        id="mobile"
                        className="border bg-blue-100 border-blue-50 p-2 outline-none"
                        {...register("mobile" , {required : true})}
                    />
                </div>
                <button type="submit" className="border bg-blue-500 mt-4 text-white rounded p-2 mt-4 hover:bg-blue-600 w-full">
                    Submit
                </button>
            </form>
        </div>
    </section>
);


};






export default EiditAdderssdetails ;