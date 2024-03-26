const express =require('express');
const mongoose= require('mongoose');
const userRoutes=require('./routes/user.route.js');
const authRoutes=require("./routes/auth.route.js")

mongoose.connect('mongodb+srv://ALIVE435:2002@cluster0.tgf93sl.mongodb.net/mern_blog')
.then((res)=>{
    console.log("database connected");
    //console.log(res);
})
const app=express();
const port=3000;

app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);





app.listen(port,()=>{
    console.log(`server is running on port ${port}!!`)
})