require("dotenv").config();
const { Router }=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {z}=require("zod");
const {auth}=require("../middleware/userAuth");
const {userModel, purchasesModel, courseModel}=require("../db");
const JWT_USER_SECRET=process.env.JWT_USER_SECRET;
const userRouter= Router();



userRouter.post("/signup",async function(req,res){

    try{

    const requiredBody=z.object({
        email:z.string().min(5).max(50).email(),
        password:z.string().min(5).max(50),
        firstName:z.string().min(3).max(15),
        lastName:z.string().min(3).max(30)
    })

    const parsedData=requiredBody.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message:"Incorrect format"
        })
        return;
    }

    const{email,password,firstName,lastName}=parsedData.data;


    const hashedPassword=await bcrypt.hash(password,5);

    //TODO: put inside a try catch block
    await userModel.create({
        email,
        password:hashedPassword,
        firstName,
        lastName
    })
    res.json({
        message:"Successfully signed up"
    })
}catch(e){
    console.log(e);
    res.status(500).json({
        message:"Internal Server Error"
    })
}
})

userRouter.post("/signin",async function(req,res){
    const{email,password}=req.body;

    const user=await userModel.findOne({
        email:email,
    })

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const verifiedUser = bcrypt.compare(password, user.password);

    if (verifiedUser) {
        const token=jwt.sign({
            id:user._id
        },JWT_USER_SECRET);
        
        res.json({
            token
        })
    }
    else{
        res.json({
            message:"Invalid Credentials"
        })
    }

    
})

userRouter.get("/purchases",auth,async function(req,res){
    const userId=req.userId;
    const courses=await purchasesModel.find({
        userId
    })

    const courseData=await courseModel.find({
        _id:{$in: courses.map(x=>x.courseId)}
    })


    res.json({
        courseData
    })
})

module.exports={
    userRouter:userRouter
}

