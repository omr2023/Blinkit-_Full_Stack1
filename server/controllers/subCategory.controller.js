import express from "express";

import SubCategoryModel from "../models/subCategory.model.js";


export const AddSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body;

        if(!name && !image && !category[0] ){
            return response.status(400).json({
                message : "Provide name, image, category",
                error : true,
                success : false
            })
        }

        const payload = {
            name,
            image,
            category
        };

        const createSubCategory = new SubCategoryModel(payload);
        const savedSubCategory = await createSubCategory.save();

        return res.status(201).json({
            success: true,
            error : false,
            message: "SubCategory created successfully",
            data: savedSubCategory
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error
        });
        
    }
}



export const GetSubCategoryController = async (req, res) => {
    try {
        const subCategories = await SubCategoryModel.find().sort({createdAt: -1}).populate("category");
        return res.status(200).json({
            success: true,
            error: false,
            message: "SubCategories fetched successfully",
            data: subCategories
        });
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
             error: true,
             success: false
        });
    }
}



export const updateSubCategoryController = async(req,res)=>{
    try {
        const { _id ,name, image ,category } = req.body 

        const checkSubCategory = await SubCategoryModel.findById(_id);
        if(!checkSubCategory){
            return res.status(404).json({
                message : "Sub Category not found",
                success : false,
                error : true,
                
            })
        }

        const update = await SubCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            category
        })

        return res.json({
            message : "Updated Category successfully",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const deleteSubCategoryController = async(req,res)=>{
    try {
        const { _id } = req.body;

        const deleteSub = await SubCategoryModel.findByIdAndDelete( _id )

        return res.json({
            message : "Sub Category deleted successfully",
            success : true,
            error : false,
            data : deleteSub
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
