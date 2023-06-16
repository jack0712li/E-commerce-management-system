import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req,res,next) =>{
    //get token from header
    const token =getTokenFromHeader(req);
    //verify token
    const decodeUser = verifyToken(token);
    //save user in request object
    if(!decodeUser) {
        throw new Error("Invalid/Expired token,please login again");
    }else{
        req.userAuthId = decodeUser?.id;
        next();
    }

    
}