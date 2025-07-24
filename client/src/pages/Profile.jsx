import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvaterEidt from "../components/UserProfileAvaterEidt";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummarApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/counterSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvaterEdit] = useState(false);
    const [loading,setLoading] = useState(false)
      const dispatch = useDispatch()
  const [userData , setUserData] = useState({
    name : user.name,
    email : user.email,
    mobile : user.mobile
  })
      useEffect(()=>{
          setUserData({
              name : user.name,
              email : user.email,
              mobile : user.mobile,
          })
      },[user])
            const handleOnChange  = (e)=>{
        const { name, value} = e.target 

        setUserData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }  
     const handleSubmit = async(e)=>{
            e.preventDefault()
            
            try {
                setLoading(true)
                const response = await Axios({
                    ...SummaryApi.updateUserDetails,
                    data : userData
                })
    
                const { data : responseData } = response
    
                if(responseData.success){
                    toast.success(responseData.message)
                    const userData = await fetchUserDetails()
                   dispatch(setUserDetails(userData.data))
                  
                }
    
            } catch (error) {
                AxiosToastError(error)
            } finally{
                setLoading(false)
            }
    
        }

  return (
    <div className="p-4">
         {/**profile upload and display image */}
      <div className="w-20 h-20  bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUserCircle className="text-white" size={60} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvaterEdit(true)}
        className="w-35 h-10 border-separate min-w-20 bg-blue-500 text-white rounded p-2 hover:bg-blue-700 mt-5"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvaterEidt close={() => setOpenProfileAvaterEdit(false)} />
      )}
      {/* name , mobile , email , change password */}
        <form action="" className="my-4 grid gap-5" onSubmit={handleSubmit} >
            <div className="grid">
            <label htmlFor="">Name :</label>
            <input 
            type="text" 
            placeholder="Enter Your name"
            className="p-2 bg-blue-50 outline-none border focus:border-primary-200 rounded"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
            />
            </div>
            <div className="grid">
            <label htmlFor="">Email :</label>
            <input 
            type="email"
            id="email" 
            placeholder="Enter Your email"
            className="p-2 bg-blue-50 outline-none border focus:border-primary-200 rounded"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
            />
            </div>
                        <div className="grid">
            <label htmlFor="mobile">Mobile :</label>
            <input 
            type="mobile" 
            id="mobile"
            placeholder="Enter Your mobile"
            className="p-2 bg-blue-50 outline-none border focus:border-primary-200 rounded"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
            />
            </div>
                        <button className='border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded'>
                {
                    loading ? "Loading..." : "Submit"
                }
            </button>
        </form>
    </div>
  );
};

export default Profile;
    //   <form action="" className="my-4">
    //     <div className="grid">
    //       <label htmlFor="">Name</label>
    //       <input
    //         type="text"
    //         placeholder="Enter Your name"
    //         className="p-2 bg-blue-50 outline-none border focus:border-primary-200 rounded"
    //         value={userData.name}
    //       />
    //     </div>
    //     </form>