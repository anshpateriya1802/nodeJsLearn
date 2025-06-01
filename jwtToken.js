const express= require("express");
const jwt= require("jsonwebtoken");

const app=express();
const JWT_SECRET="HURRAY";

app.use(express.json());

let users=[];

function auth(req,res,next){

    const token=req.headers.token;

    if(!token){
        res.status(401).send({
            message:"TOKEN NOT PROVIDED"
        })
    }
    const validateUser=jwt.verify(token,JWT_SECRET);

    

    if(validateUser.username){
        req.username=validateUser.username;
        next()
    }else{
        res.status(401).send({
            message:"USER NOT FOUND"
        })
        
    }


}

app.get("/",function(req,res){
    res.sendFile(__dirname+"/jwtToken.html");
})

app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"YOU ARE SIGNED UP"
    })

})

app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    let foundUser=users.find(u=>u.username===username);

    if(foundUser){
        const token=jwt.sign({
            username:username
        },JWT_SECRET);
        
        res.json({
            token:token
        })
    }

})

app.get("/me",auth,function(req,res){
    

    let foundUser=users.find(u=>u.username===req.username);
    
        res.json({
        username:foundUser.username,
        password:foundUser.password
        })
    
  
    

})

app.listen(3000);
