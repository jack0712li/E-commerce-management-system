import User from "../model/User.js"



const isAdmin =async (req, res, next) => {
    //find login user
    const user = await User.findById(req.userAuthId);
    //check if user is admin
    if (user.isAdmin) {
        next();
    }
    else {
        next(new Error("Not authorized as an admin"));
    
    }

};

export default isAdmin;

