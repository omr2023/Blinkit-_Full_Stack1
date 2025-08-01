import { v2 as cloudinary } from "cloudinary"


    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret :process.env.CLOUDINARY_API_SECREPT 
// Click 'View API Keys' above to copy your API secret
    })



const uploadImageClodinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())
 
    const upladImage = await new Promise((resolve ,reject)=>{
        cloudinary.uploader.upload_stream({folder : "binkeyt"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })

    return upladImage
}



export default uploadImageClodinary;