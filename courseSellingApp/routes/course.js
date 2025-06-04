
const {Router}=require("express");
const { auth } = require("../middleware/userAuth");
const { purchasesModel, courseModel } = require("../db");

const courseRouter=Router();


courseRouter.post("/purchase",auth,async function(req,res){
    
    const userId=req.userId;
    const courseId=req.body.courseId;
    // console.log(userId);
    await purchasesModel.create({
        courseId,
        userId
        
    })


    res.json({
        message:"course purchase successfull"
    })
})

courseRouter.get ("/preview",async function(req,res){
    const courses = await courseModel.find({});
    res.json({
        courses
    })
})

module.exports={
    courseRouter:courseRouter
}