import Adderssmodele from "../models/adderss.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (requset , response)=>{
    try {
        const userId = requset.userId //middleware
        const { aaddress_line ,  city , state , pincode , country , mobile  } = requset.body

        const createAdderss = new Adderssmodele({
            aaddress_line,
            city,
            state,
            country,
            mobile,
            pincode,
            userId : userId
        })

        const seaveaddress = await createAdderss.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId,{
            $push : {
                address_details : seaveaddress._id
            }
        })

        return response.json({
            message : "Address Created Successfully",
            error : false,
            success : true,
            data : seaveaddress
        })
    } catch (error) {
        return response.status(500).json({
             message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getAddressController = async(request,response)=>{
    try {
        const userId = request.userId // middleware auth

        const data = await Adderssmodele.find({ userId : userId }).sort({ createdAt: -1 })

        return response.json({
            data : data,
            message : "List of address",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const updateAddressController = async(request,response)=>{
    try {
        const userId = request.userId //midderwear
        const {_id , aaddress_line , city , state , country , mobile , pincode } = request.body

        const updateAddress = await Adderssmodele.updateOne({ _id : _id , userId : userId},{
            aaddress_line ,
            city,
            state,
            country,
            pincode,
            mobile
        })

        return response.json({
            message : 'Address Update',
            error : false,
            success : true,
            data : updateAddress
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const deleteAddressController = async(request , response)=>{
    try {
        const userId = request.userId //middleware
        const {_id } = request.body

        const disableAddress = await Adderssmodele.updateOne({_id : _id , userId : userId},{
            status : false
        })

        return response.json({
            message : "Delete Address",
            error: false,
            success : true , 
            data : disableAddress
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
