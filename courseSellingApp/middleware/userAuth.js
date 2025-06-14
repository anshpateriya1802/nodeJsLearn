require("dotenv").config();
const jwt=require("jsonwebtoken");
const JWT_USER_SECRET=process.env.JWT_USER_SECRET;


async function auth(req,res,next){
    const token=req.headers.token;

    const verifiedUser=jwt.verify(token,JWT_USER_SECRET);


    if(verifiedUser){
        req.userId=verifiedUser.id;
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