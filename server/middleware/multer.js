
import multer from "multer";



const storaoge = multer.memoryStorage()

const upload = multer({storage: storaoge})
// This middleware will store the uploaded files in memory
// so that they can be accessed as buffers in the request object.
// You can also configure it to store files on disk or in a cloud service.

export default upload


// import multer from "multer";
// import path from "path";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Specify the directory to store uploaded files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the original file extension
//   }
// });
// const upload = multer({ storage: storage });

// export default upload.single('file'); // 'file' is the name of the form field that contains the file