import { Request ,Response, NextFunction } from "express";
import UserModel from "../models/user_model";
import User from "../types/user_type";

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
            if(!data){
                return res.status(404).json({ status: 'failed' , message:`User Not Found`})
            }

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
            const input: User = {
                id: req.params.id,
                email: req.body.email,
                user_name: req.body.user_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            };
            const data = await user.updateOne(input); 
            if(!data){
                return res.status(404).json({ status: 'failed' , message:`User Not Found`})
            }
            res.status(201).json({ status: 'success' , data , message:`User Updated successfully`})
            
        } catch (error) {
            next(error)
        }

    }



//DELETE
const deleteOne = async (req:Request, res:Response , next:NextFunction)=>{
        try {
             const data = await user.deleteOne(req.params.id as string); // as unknown
             if(!data){
                return res.status(404).json({ status: 'failed' , message:`User Not Found`})
            }
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