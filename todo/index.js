const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
// const JWT_SECRET="asdasdasd"
const { UserModel, TodoModel }=require("./db");
const { auth , JWT_SECRET }=require("./auth");

const app=express();

app.use(express.json());

mongoose.connect("mongodb+srv://ansh:UPNNwgiV7ftA5Ali@cluster0.8fjg80r.mongodb.net/TODO");


app.post("/signup",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
    res.json({
        message:"Successfully Signed In"
    })

    
});

app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    
    const response=await UserModel.findOne({
        email:email,
        password:password
    });

    if(response){
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