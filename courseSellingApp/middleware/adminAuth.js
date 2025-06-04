require("dotenv").config();
const jwt=require("jsonwebtoken");
const JWT_ADMIN_SECRET=process.env.JWT_ADMIN_SECRET;


async function auth(req,res,next){
    const token=req.headers.token;

    const verifiedAdmin=jwt.verify(token,JWT_ADMIN_SECRET);


    if(verifiedAdmin){
        req.adminId=verifiedAdmin.id;
        next();
    }else{
        res.status(403).json({
            message:"Invalid credentials"
        })
    }
    
}

module.exports={
    auth
}