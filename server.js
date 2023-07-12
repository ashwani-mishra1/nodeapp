const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
const userRouter=require('./src/routes/userRoutes');
app.use("/users",userRouter);



mongoose.connect("mongodb+srv://ashwani:ashwani123@cluster0.68r8vua.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000,()=>{
        console.log("App is runnning. DB Connected.");
    })
})
.catch((error)=>{
    console.log(error);
})