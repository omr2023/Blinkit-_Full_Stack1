import {Router} from "express"
import auth from "../middleware/auth.js"
import { createProductController, deleteProductDetails, getProductByCategoryAndSubCategory, getProductCategory, getProductController, getProductDetails, searchProductController, updateProductDetails } from "../controllers/product.controller.js"
import { admin } from "../middleware/Admin.js"

const productRouter = Router()

productRouter.post("/create", auth,admin , createProductController)

productRouter.post("/get", getProductController)

productRouter.post("/get-product-by-category",getProductCategory)

productRouter.post("/get-pruduct-by-category-and-subcategory",getProductByCategoryAndSubCategory)

productRouter.post("/get-product-details",getProductDetails)

// update product details
productRouter.put("/update-product-details",auth,admin,updateProductDetails)

// delete product
productRouter.delete("/dlete-product-details",auth,admin,deleteProductDetails)

// search product
productRouter.post("/search-product",searchProductController)
export default productRouter