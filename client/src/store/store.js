import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './counterSlice'
import productReducer from './ProductSlice'
import cartRouter from './cartProduct'
import addresReducer from './addressSlice'
import orderReducer from './orderSlice'
export const store = configureStore({
  reducer: {
    user : useReducer,
    // Add other reducers here as needed
    product : productReducer, 
    cartItem : cartRouter,
    address : addresReducer,
     orders : orderReducer

  },
})