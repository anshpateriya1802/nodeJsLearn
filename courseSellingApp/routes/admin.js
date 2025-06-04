require("dotenv").config();
const {Router}= require("express");
const{adminModel}=require("../db")
const adminRouter=Router();
const { z } = require("zod");
const JWT_ADMIN_SECRET=process.env.JWT_ADMIN_SECRET;
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");

adminRouter.post("/signup",async function(req,res){

   try{
    const requiredBody = z.object({
        email:z.string().min(5).max(50).email(),
        password:z.string().min(5).max(50),
        firstName:z.string().min(3).max(15),
        lastName:z.string().min(3).max(30)
    })

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success){
        return res.json({
            message:"Invalid format"
        })
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword=await bcrypt.hash(password,5);

    await adminModel.create({
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

adminRouter.post("/signin",async function(req,res){

    const {email,password}=req.body;

    const admin = await adminModel.findOne({
        email: email
    })

    if(!user){
        res.status(401).json({
            message:"Invalid Credentials"
        })
    }

    const passwordMatch = bcrypt.compare(password,user.password);

    if(passwordMatch){
        const token = jwt.sign({
            id:admin._id
        },JWT_ADMIN_SECRET)

        res.json({
            token
        })
    }
    else{
        res.json(403).json({
            message:"Invalid credentials"
        })
    }

    
})

// to create a course
adminRouter.post("/course",function(req,res){
    res.json({
        message:"course creation endpoint"
    })
})
// to update a course
adminRouter.put("/course",function(req,res){
    res.json({
        message:"course updation endpoint"
    })
})
// to get all the courses
adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message:"seeing all courses endpoint"
    })
})

module.exports={
    adminRouter:adminRouter
}
