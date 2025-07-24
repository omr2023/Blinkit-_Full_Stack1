// import { getProductCategory } from "../../../server/controllers/product.controller";
export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  forgot_password_otp: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  userDetails : {
    url:"/api/user/user-details",
    method: "get"
  },
  logout :{
    url : "/api/user/logout",
    method : "get"
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put"
  },
  updateUserDetails:{
    url: "/api/user/update-user",
    method: "put"
  },
  addCategory:{
    url : '/api/category/add-category',
    method : "post"
  },
  uploadImage:{
    url : "/api/file/upload",
    method : "post"
  },
  getCategory: {
    url: "/api/category/get",
    method: "get"
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put"
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete"
  },
  addSubCategory: {
    url: "/api/subCategory/create",
    method: "post"
  },
  getSubCategory: {
    url: "/api/subCategory/get",
    method: "post"
  },
  updateSubCategory: {
    url: "/api/subCategory/update",
    method: "put"
  },
  deleteSubCategory: {
    url: "/api/subCategory/delete",
    method: "delete"
  },
  createProduct : {
    url: "/api/product/create",
    method: "post"
  },
  getProducts : {
    url : "/api/product/get",
    method : "post"
  },
  getProductByCategory : {
    url : "/api/product/get-product-by-category",
    method: "post"
  },
  getProductByCategoryAndsubCategory : {
    url : "/api/product/get-pruduct-by-category-and-subcategory",
    method : "post"
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "post"
  },
  updateProductDetails: {
    url: "/api/product/update-product-details",
    method: "put"
  },
  deleteProductDetails: {
    url: "/api/product/dlete-product-details",
    method: "delete"
  },
  searchProduct: {
    url: "/api/product/search-product",
    method: "post"
  },
  addToCart: {
    url: "/api/cart/create",
    method: "post"
  },
  getCartItem :{
    url : "/api/cart/get",
    method: "get"
  },
  updateCartItemQty :{
    url : "/api/cart/update-qty",
    method : 'put'
  },
  deleteCartItem :{
    url : "/api/cart/delete-cart-item",
    method : "delete"
  },
  createAdderss : {
    url : "/api/address/create",
    method : "post"
  },
  getAdderss : {
    url : "/api/address/get",
    method : "get"
  },
  updateAddress : {
    url : "/api/address/update",
    method : "put"
  },
  disableAdderss : {
    url : "/api/address/disable",
    method : "delete"
  },
  CashOnDeliveryOrderController :{
    url : "/api/order/cash-on-delivery",
    method : "post"
  },
  paymenit_url : {
    url : "/api/order/checkout",
    method : "post"
  },
  GetOrderList : {
    url: "/api/order/order-list",
    method : "get"
  }
  
};


export default SummaryApi;
