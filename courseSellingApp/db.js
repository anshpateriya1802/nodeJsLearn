const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>{
    console.log(err);
}); 


 

const User=new Schema({
    email: {type:String, unique:true},
    password: String,
    firstName: String,
    lastName: String

});

const Course=new Schema({
    title:String,
    description:String,
    price: Number,
    imageUrl: String,
    creatorID: ObjectId

});

const Admin=new Schema({
    email: {type:String, unique:true},
    password: String,
    firstName: String,
    lastName: String

});
const Purchases=new Schema({
    courseId:ObjectId,
    userid:ObjectId

}); 

const userModel=mongoose.model('users',User);
const adminModel=mongoose.model('admin',Admin);
const courseModel=mongoose.model('course',Course);
const purchasesModel=mongoose.model('purchases',Purchases);


module.exports={
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchasesModel:purchasesModel 
}

