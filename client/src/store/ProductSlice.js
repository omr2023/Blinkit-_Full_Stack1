import {createSlice} from '@reduxjs/toolkit';


const initialValue = {
    allCategorie: [],
    loadingCategory :false,
    allsubCategory : [],
    product: [],
}



const ProductSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        setAllCategorie : (state, action) => {
            state.allCategorie = [...action.payload];
        },

        setLoadingCategory : (state , action) =>{
            state.loadingCategory = action.payload
        },

        setAllSubCategory: (state, action) => {
        state.allsubCategory = [...action.payload];
        },

        setProduct: (state, action) => {
            state.product = [...action.payload];
        },

    },
})


export const {setAllCategorie, setAllSubCategory, setProduct , setLoadingCategory} = ProductSlice.actions;
export default ProductSlice.reducer;