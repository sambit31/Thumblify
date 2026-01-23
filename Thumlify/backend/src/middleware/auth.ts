import { Request,Response,NextFunction } from "express";

export const protect = async (req:Request, res:Response,next:NextFunction)=>{
    const {isLoggIn, userId} = req.session;

    if(!isLoggIn || !userId){
        return res.status(401).json({message:"you are not logged in"});
    }
    next();
}