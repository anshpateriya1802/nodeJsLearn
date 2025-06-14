const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const User=new Schema({
    email: {type:String, unique:true},
    password: String,
    name: String

});

const Todo=new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
});

const UserModel=mongoose.model('Users',User);
const TodoModel=mongoose.model('todos',Todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}
