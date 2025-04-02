const express=require("express");
const app=express();


// Sum till n

// function Summ(n){
//     let twoSum=0;
//     for(let i=0;i<n;i++){
//         twoSum+=i;

//     }
//     return twoSum;
// }

// app.get("/",function(req,res){
//     const too=Summ(3);
//     res.send(too);
// })

// Sum of two digits passed by the user in address bar

// function twoSum(a,b){
//     return a+b;
// }

// app.get('/',function(req,res){
//     const a=Number(req.query.a);
//     const b=Number(req.query.b);
//     const ans=twoSum(a,b);
//     res.send(ans.toString());
    
// })

var user=[{
    name:"john",
    kidneys:[{
        healthy:false
    }]
}]

app.use(express.json());
app.get("/",function(req,res){
    const johnKidneys= user[0].kidneys;
    const numberOfKidneys=johnKidneys.length;
    let numberOfHealthyKidneys=0;

    for(let i=0;i<numberOfKidneys;i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys=numberOfHealthyKidneys+1;
        }
    }

    const numberOfUnhealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

});

// adding healthy kidneys


app.post("/",function(req,res){
    let isHealthy=req.body.isHealthy;
    console.log(isHealthy);
    
    user[0].kidneys.push({healthy:isHealthy});
    
    res.json({
        msg:"DONE!!!"
    });
});

// replacing unhealthy kidneys with healthy kidneys

app.put("/",function(req,res){
    if(checkingUnhealthyKidneys()){
    for(let i=0;i<user[0].kidneys.length;i++){
        user[0].kidneys[i].healthy=true;
    }
    res.json({
        msg:"DONE!!!"
    });
}
else{
    res.status(411).json({
        msg:"smjh bhai teri kidney achi h abhi"
    })
}
})

// to check if there is any unhealthy kidney

function checkingUnhealthyKidneys(){
    let unhealthyKidneyCheck= false;
    for(let i=0;i<user[0].kidneys.length;i++){
        if(!user[0].kidneys[i].healthy){
            unhealthyKidneyCheck=true;
        }
    }
    return unhealthyKidneyCheck;
}

// removing all unhealthy kidneys

app.delete("/",function(req,res){

    if(checkingUnhealthyKidneys()){
    let newKidney=[]
    for(let i=0;i<user[0].kidneys.length;i++){
        if(user[0].kidneys[i].healthy){
            newKidney.push({
                healthy:true
            })
        }
    }
    user[0].kidneys=newKidney;
    res.json({
        msg:"DONE!!!"
    })
}
else{
    res.status(411).json({
        msg:"YOU HAVE NO BAD KIDNEYS"
    });
}


})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})