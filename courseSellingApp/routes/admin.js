require("dotenv").config();
const {Router}= require("express");
const{adminModel, courseModel}=require("../db")
const adminRouter=Router();
const { z } = require("zod");
const JWT_ADMIN_SECRET=process.env.JWT_ADMIN_SECRET;
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");
const { auth } = require("../middleware/adminAuth");

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
    const passwordMatch = await bcrypt.compare(password,admin.password);

    if(admin && passwordMatch){
        const token = jwt.sign({
            id:admin._id
        },JWT_ADMIN_SECRET)

        res.json({
            token
        })
        
    }



    else{
        res.status(401).json({
            message:"Invalid Credentials"
        })
        
    }

    
})

// to create a course
adminRouter.post("/course",auth,async function(req,res){
    const adminId=req.adminId;

    const {title, description, price, imageUrl, creatorId }= req.body;
    
    const course=await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:adminId
    });

    res.json({
        message:"course creation successful",
        courseId: course.id
    })
})
// to update a course
adminRouter.put("/course", auth, async function(req, res) {
    const adminId = req.adminId;
    const { title, description, price, imageUrl, courseId } = req.body;

    const updatedCourse = await courseModel.findOneAndUpdate(
        { _id: courseId, creatorId:adminId },
        { title, description, price, imageUrl },
    );

    if (!updatedCourse) {
        return res.status(404).json({
            message: "Course not found or not authorized"
        });
    }

    res.json({
        message: "Course updated",
        courseId: updatedCourse._id
    });
})
// to get all the courses
adminRouter.get("/course/bulk",auth,async function(req,res){
    const adminId=req.adminId;
    const courses=await courseModel.find({
        creatorId:adminId

    })
    res.json({
        
        courses
    })
})

module.exports={
    adminRouter:adminRouter
}
