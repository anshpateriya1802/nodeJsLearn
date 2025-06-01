const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");

const JWT_SECRET="HURRAY";

const users=[];
app.use(express.json());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/jwtToken.html");
})


function auth(req,res,next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_SECRET);
    if(decodedData.username){
        req.username=decodedData.username;
        next()
    }else{
        res.json({
            message:"YOU ARE NOT LOGGED IN"
        })
    }

}

app.use(auth);

app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message:"You are signed up"
    })

})

app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    let foundUser=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            foundUser=users[i];
        }
    }
    if(!foundUser){
        res.json({
            message:"INVALID USER"
        })
        return
    }else{
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token:token
        })
    }

})

app.get("/me",function(req,res){


    
    let foundUser=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username===req.username){
            foundUser=users[i];
        }
    }
    res.json({
        username:foundUser.username,
        password:foundUser.password
    })
    


})

app.listen(3000);