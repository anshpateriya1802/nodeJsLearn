const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const {userRouter, courseRouter}=require("./routes")

const app=express();

mongoose.connect("mongodb+srv://ansh:UPNNwgiV7ftA5Ali@cluster0.8fjg80r.mongodb.net/course-selling-app"); 

app.use(express.json());

app.use("/user",userRouter);
app.use("/course",courseRouter);





app.listen(3000);

