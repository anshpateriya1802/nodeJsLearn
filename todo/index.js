
require("dotenv").config();
const express=require("express");

const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const { z } = require("zod");
const { UserModel, TodoModel }=require("./db");
const { auth  }=require("./auth");

const JWT_SECRET=process.env.JWT_SECRET;

const app=express();

app.use(express.json());

mongoose.connect("mongodb+srv://ansh:UPNNwgiV7ftA5Ali@cluster0.8fjg80r.mongodb.net/TODO");


app.post("/signup",async function(req,res){
    try{
    // validating schema for the input whether it matches the format or not
    const requiredBody=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(20),
        name:z.string().min(3).max(100)
    })
    // this validates the req.body with the requirebody schema
    const parsedData=requiredBody.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message:"Incorrect format"
        })
    }

    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    

    const hashedPassword=await bcrypt.hash(password,5);

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });
    res.json({
        message:"Successfully Signed Up"
    })
}catch(e){
    res.json({
        message:"Error signing up"
    })
    
}
    
});

app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    
    const response=await UserModel.findOne({
        email:email
    });

    const passwordMatch= bcrypt.compare(password,response.password);

    if(response && passwordMatch){
        const token=jwt.sign({
            id:response._id.toString()
        },JWT_SECRET)

        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"Invalid Credentials"
        })
    }
});

app.post("/todo",auth,function(req,res){
    const userId=req.userId;
    const title=req.body.title;
    TodoModel.create({
        title,
        userId
    })
    res.json({
        message:"TODO created"
    })


});

app.get("/todos",auth,async function(req,res){

    
    const userId=req.userId;

    const todos=await TodoModel.find({
        userId:userId
    })
    res.json({
        todos
    })

});

app.listen(3000);