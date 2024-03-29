const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:String,
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("User",UserSchema);
