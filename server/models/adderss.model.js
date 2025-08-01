
import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
     aaddress_line:{
        type: String,
        default:""
    },
    city :{
        type : String,
        default :""
    },
    state:{
        type : String,
        default:""
    },
    pincode :{
        type : String,

    },
    country :{
        type : String
    },
    mobile: {
        type: Number,
        default: null
    },
    status :{
        type : Boolean,
        default: true
    },
    userId :{
        type : mongoose.Schema.ObjectId,
        default : ""
    }
},{
    timestamps : true
})


const Adderssmodele = mongoose.model("address",addressSchema)

export default Adderssmodele