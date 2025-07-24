import { createSlice } from "@reduxjs/toolkit";


const initialVlue = {
    addressList : []

};

const addressSlice = createSlice({
    name : "address",
    initialState : initialVlue,
    reducers : {
        handleAddAddress :  (state, action) =>{
            state.addressList = [...action.payload]
        }
    } 
})


export const {handleAddAddress}=addressSlice.actions

export default addressSlice.reducer