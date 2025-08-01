import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetpassword,
  updateUserDetails,
  uploadAvater,
  userDetails,
  verifyEmailControllar,
  verifyForgotPasswordOtp,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);

userRouter.post("/verify-email", verifyEmailControllar);

userRouter.post("/login", loginController);

userRouter.get("/logout", auth, logoutController);

userRouter.put("/upload-avatar", auth,upload.single("avatar"), uploadAvater);

userRouter.put("/update-user", auth, updateUserDetails);

userRouter.put("/forgot-password", forgotPasswordController);

userRouter.put("/verify-forgot-password-otp",verifyForgotPasswordOtp)

userRouter.put("/reset-password", resetpassword)

userRouter.post("/refresh-token", refreshToken)

userRouter.get('/user-details',auth,userDetails)



export default userRouter;
