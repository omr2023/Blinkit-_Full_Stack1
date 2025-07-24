import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryController, DeleteCategoryController, GetCategoryController, UpdateCategoryController } from "../controllers/category.controller.js";



const categoryRouter = Router()
// Define the route for adding a category
categoryRouter.post("/add-category",auth,AddCategoryController);
// Define the route for getting all categories
categoryRouter.get("/get",GetCategoryController)
// Define the route for updating a category
categoryRouter.put("/update",auth,UpdateCategoryController);
//         $in: _id,
categoryRouter.delete("/delete",auth,DeleteCategoryController)

export default categoryRouter