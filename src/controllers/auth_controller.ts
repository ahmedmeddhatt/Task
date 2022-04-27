
import { Request ,Response, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import config from "../config";
import UserModel from "../models/user_model";

const user = new UserModel()



//AUTHENTICATION
export const authentication = async (req:Request, res:Response , next:NextFunction)=>{
    try {
        const {email, password} = req.body
        const data = await user.authenticate(email, password as string); // as unknown
        const token = Jwt.sign({ user}, config.tokenSecret as string)
        if(!data){

            res.status(401).json({ status: 'error' ,
             message:` Wrong Username or Password, Please tyr again !!`})
        }

        res.status(200).json({ status: 'success' ,data:{...data ,token} ,
         message:`User Authenticated successfully`})

        
    } catch (error) {
        return next(error)
    }

}