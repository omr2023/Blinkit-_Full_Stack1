
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name :{
        type: String,
        require : [true,"Provide name"]
    },
        email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: ""
    },
    mobile :{
        type: Number,
        default: null
    },
    refresh_token :{
        type: String,
        default : ""
    },
    verify_email :{
        type: Boolean,
        default: false
    },
    last_login_date : {
        type: Date,
        default: ""
    },
    status:{
        type: String,
        enum: ["Active","Inactive","Suspended"],
        default : "Active"
    },
    address_details :[{
        type: mongoose.Schema.ObjectId,
        ref: "address"
    }],
    Shopping_cart :[{
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct"
    }],
    orderHistory :[{
        type: mongoose.Schema.ObjectId,
        ref: "order"
    }],
    forgot_password_otp:{
        type : String,
        default: null
    },
     forgot_password_expiry :{
        type: Date,
        default : ""
     },
     role :{
        type: String,
        enum : ["ADMIN", "USER"],
        default: "USER"
     }
},{
    timestamps : true
})

const UserModel = mongoose.model("User", userSchema)


export default UserModel


// ADMIN = "ADMIN" ADMI
