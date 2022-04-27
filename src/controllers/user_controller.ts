import { Request ,Response, NextFunction } from "express";
import UserModel from "../models/user_model";

const user = new UserModel()


// GET ALL
const getMany = async (req:Request, res:Response , next:NextFunction)=>{
    try {
        const data = await user.getMany();
        res.status(200).json({Results : data.length , status: 'success' , data ,
         message:`All Users Reviewed successfully`})
        
    } catch (error) {
        next(error)
        }

    }
    

//GET ONE
const getOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const data = await user.getOne(req.params.id as string); // as unknown
            res.status(200).json({ status: 'success' , data , message:`User Reviewed successfully`})
            
        } catch (error) {
            next(error)
        }

    }

//CREATE
const Create = async (req:Request, res:Response , next:NextFunction)=>{
            try {
                const data = await user.create(req.body);
                res.status(201).json({ status: 'success' , data , message:`User Created successfully`})
                
            } catch (error) {
                next(error)
            }
    
        }
    
//UPDATE
const updateOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
            const data = await user.updateOne(req.body); 
            res.status(201).json({ status: 'success' , data , message:`User Updated successfully`})
            
        } catch (error) {
            next(error)
        }

    }



//DELETE
const deleteOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
             await user.deleteOne(req.params.id as string); // as unknown
            res.status(200).json({ status: 'success' , message:`User Deleted successfully`})
            
        } catch (error) {
            next(error)
        }

    }



    




export default {
        Create,
        getMany ,
        getOne ,
        updateOne ,
        deleteOne 
}