const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const SECRET_KEY="ASHWANI";

const userModel=require('../models/user');

const signup = async (req,res)=>{
    const {first_name,last_name,email,password} = req.body;

    try{
        const existingUser= await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({status:false,message:"User Already Exist."});
        }

        const hash=await bcrypt.hash(password,10);

        const newUser=await userModel.create({
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:hash
        });

        const token=jwt.sign({email:newUser.email,id:newUser._id},SECRET_KEY);
        res.status(201).json({status:true,message:"User Registered Successfully.",token:token});


    }catch(error){
        console.log(error);
        res.sendStatus(500).json({status:false,message:error});
    }
    
}

const login = async (req,res) =>{
    const {email,password}=req.body;

    try {
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            res.status(404).json({status:false,message:"User Not Exist"});
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            res.status(404).json({status:false,message:"Invalid Credentials."})
        }
        const token=await jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(200).json({status:true,message:"Logged In Successfully",token:token});
    } catch (error) {
        res.status(500).json({status:false,message:error});
    }



}

module.exports={signup,login};