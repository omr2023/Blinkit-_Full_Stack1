import {createSlice} from "@reduxjs/toolkit"



const initialValue = {
    _id : "",
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    verify_email:"",
    last_login_date:"",
    status:"",
    address_details : [],
    Shopping_cart: [],
    orderHistory : [],
    role : "",

}

const userSlice = createSlice({
    name : "user",
    initialState :initialValue,
    reducers : {
        setUserDetails : (state,action) =>{
            state.name =action.payload?.name
            state.email=action.payload?.email 
            state._id = action.payload?._id
            state.avatar=action.payload?.avatar
            state.mobile=action.payload?.mobile
            state.verify_email=action.payload?.verify_email
            state.last_login_date=action.payload?.last_login_date
            state.status=action.payload.status
            state.address_details = action.payload?.address_details
            state.Shopping_cart = action.payload?.Shopping_cart
            state.orderHistory = action.payload?.orderHistory
            state.role = action.payload?.role
        },
        updatedAvater : (state , action) => {
        state.avatar=action.payload
        },
        // eslint-disable-next-line no-unused-vars
        logout : (state, action)=>{
            state._id = ""
            state.name  = ""
            state.email = ""
            state.avatar = ""
            state.mobile = ""
            state.verify_email = ""
            state.last_login_date = ""
            state.status = ""
            state.address_details = []
            state.Shopping_cart = []
            state.orderHistory = []
            state.role = ""
        }
    }
})


export const {setUserDetails , logout , updatedAvater} = userSlice.actions

export default userSlice.reducer