const jwt=require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET=process.env.JWT_SECRET;

function auth(req,res,next){
    const token=req.headers.token;
    const response=jwt.verify(token,JWT_SECRET);

    if(response){
        req.UserId=token.id;
        next();
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
}

module.exports={
    auth
}