import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";


export const AddToCartItemController = async (request, response) => {
    try {
        const userId = request.userId;

        const { productId } = request.body;

        if (!productId) {
            return response.status(400).json({
                message: "Product ID and quantity are requiredID",
                error: true,
                success: false
            });
        }



        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        }) 
        
        if(checkItemCart){
            return response.status(400).json({
                message : "Item already in Cart"
            })
        }

        const cartItem = new CartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const savedCartItem = await cartItem.save();

        const updateCartUser = await UserModel.updateOne({_id : userId},{
            $push: { 
                 Shopping_cart : productId
             }
        })


        return response.status(201).json({
            message: "Product added to cart successfully",
            data: savedCartItem,
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
        
    }
}


export const getCartItemController = async(request,response)=>{
    try {
        const userId = request.userId

        const cartItem =  await CartProductModel.find({
            userId : userId
        }).populate('productId')

        return response.json({
            data : cartItem,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const updateCartItemQtyController = async(request,response)=>{
    try {
        const userId = request.userId

        const {_id , qty} = request.body
        
        if(!_id || !qty ){
            return response.status(400).json({
                message : "Provide _id = qty"
            })
        }

        const updateCartItem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
        },{
            quantity : qty
        })

        return response.json({
            message : "update Cart",
            success : true,
            error : false,
            data : updateCartItem
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const deleteCartItemQtyController = async(request,response)=>{
    try {
        const userId = request.userId // middleware
        const {_id } = request.body

        if(!_id){
            return response.status(400).json({
                message : "provde _id",
                error : true,
                success : false
            })
        }


        const deleteCartItem = await CartProductModel.deleteOne({_id : _id , userId : userId})

        
        return response.json({
            message : "delete Item",
            success : true,
            error : false,
            data : deleteCartItem
        })
    } catch (error) {
            return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
