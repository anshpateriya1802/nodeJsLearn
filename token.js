const express=require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const app= express();
const jwt=require('jsonwebtoken')



let users=[];

const JWT_SECRET="PAPAJI";
app.use(express.json());

app.post("/signup",function(req, res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username : username,
        password : password,
    })
    res.json({
        message:"You are signed in"
    })
});

// app.post("/signin",(req, res)=>{
//     const username=req.body.username;
//     const password=req.body.password;

//     let user=users.find((u)=>u.username==username && u.password==password);

//     if(user){
//         let token=generateToken();
//         user.token=token;
//         res.json({
//             message:token
//         })
//     }else{
//         res.status(403).json({
//             message:"Invalid username or password"
//         })
//     }

// });

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: user.username,
            password:user.password
        }, JWT_SECRET);

        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});

// app.get("/me", (req, res) => {
//     const token = req.headers.token;
//     const user = users.find(user => user.token === token);
//     if (user) {
//         res.send({
//             username: user.username
//         })
//     } else {
//         res.status(401).send({
//             message: "Unauthorized"
//         })
//     }
// })


app.get("/me", (req, res) => {
    const token = req.headers.token;
    const userDetails = jwt.verify(token, JWT_SECRET);

    const username =  userDetails.username;
    const user = users.find(user => user.username === username);

    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000);