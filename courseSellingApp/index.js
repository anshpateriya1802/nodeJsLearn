const express=require("express");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const mongoose=require("mongoose");

const app=express();


app.use(express.json());

// v1 is the version and api is denoting its a API route 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

// we are doing this so that the app wont start before connecting to the db 
async function main(){
    await mongoose.connect(process.env.MONGO_DB);  

app.listen(3000);
console.log("listening to port 3000");
}
main();
