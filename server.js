const express=require('express')
const app=express()
const mongoose=require('mongoose');
const connectdb=require('./Middleware/db');
const usercontroller=require('./Controllers/userController');
app.use(express.json())
connectdb();
app.get('/',(req,res)=>{
    res.send('My Home');
})

app.put('/update/:id',usercontroller.update)
app.post('/login',usercontroller.login);
app.post('/register',usercontroller.register);
app.get('/get-user',usercontroller.getAllUsers);
app.listen(5000,()=>{
    console.log(`Server started on 5000`)
})