const {Router}= require("express");

const adminRouter=Router();

adminRouter.post("/signup",function(req,res){
    
})

adminRouter.post("/signin",function(req,res){

})

// to create a course
adminRouter.post("/course",function(req,res){

})
// to update a course
adminRouter.put("/course",function(req,res){

})
// to get all the courses
adminRouter.get("/course/bulk",function(req,res){

})

module.exports={
    adminRouter:adminRouter
}
