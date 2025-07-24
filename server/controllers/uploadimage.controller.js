import uploadImageClodinary from "../utils/uploadimageClodinany.js"

const uploadImageController = async(request , response) =>{
    try {
        const file = request.file

       console.log("File received for upload:", file);

        const uploadImage = await uploadImageClodinary(file)

   
        
        return response.json({
            message : "Image uploaded successfully",
            data :  uploadImage,
            success : true,
            status : 200,
            error : false
            
        }) 
    } catch (error) {
        return response.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export default uploadImageController;