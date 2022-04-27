import { Request ,Response, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import config from "../config";
import Error from "../interface/error.interface";


const authError = (next: NextFunction)=>{
    const error:Error = new Error (`Login error , Please try again !`) ;
    error.status = 401 
    next(error);
}

const validator = ( req: Request , res : Response, next : NextFunction)=>{
try {
    
    const authHeader = req.get('Authorization')
    
    if(authHeader){
        const bearer = authHeader.split(' ')[0] ;
        const token = authHeader.split(' ')[1]
        console.log( 'bearer' , bearer);
        if(token && bearer === 'Bearer'){

            const decode = Jwt.verify(token , config.tokenSecret as unknown as string) ;
            
            if(decode){
                next()
            }else{
                // failed to authenticate user
                authError(next)
            }

        }else{
            //token type not bearer
            authError(next)
        }
    }else{
        // no token found
        authError(next)
    }
    



} catch (error) {
    // no token found
    authError(next)
}

}


export default validator