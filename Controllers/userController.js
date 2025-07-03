const User=require('../Models/userSchema')
const bcrypt = require('bcryptjs');
const update = async  (req,res) => {
  try {
    const {first_name,last_name,email,password,mobile_number} = req.body
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message: "User Not Found"});
 
    if(email && email !== user.email) {
      const emailExists = await User.findOne({ email })
      if(emailExists && emailExists._id.toString() !== userId) {
        return res.status(409).json({ message: " Email already in use "})
      }
      user.email = email
    }
 
    if(mobile_number && mobile_number !== user.mobile_number) {
      const mobileExists = await User.findOne({ mobile_number })
      if(mobileExists && mobileExists._id.toString() !== userId) {
          return res.status(409).json({ message: " Mobile Number already in use "})
      }
      user.mobile_number = mobile_number
    }
    if(first_name !== undefined) user.first_name = first_name;
        if(last_name !== undefined) user.last_name = last_name;
 
        if(password) {
          if(password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters."})
          }
          user.password = await bcrypt.hash(password, 10);
        }
 
        const updateUser = await user.save();
        const { password: _, ...userData} = updateUser.toObject();
        return res.status(201).json({ message: "User Updated Successfully", data:userData})
  } catch (err) {
          res.status(500).json({ message: "Internal Server Error", err: err });
  }
};
 
const deleteUser = async (req,res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId)
    if(!deleteUser) {
      return res.status(404).json({ message: "User Not Found"})
    }
    return res.status(201).json({ message: "User deleted Successfully"})
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err });
 
  }
};
const register= async(req,res)=>{
  try{
  const{firstname,lastname,email,password,mobileno,role}=req.body;
  if(!firstname || !lastname || !email ||!password ||!mobileno || !role){
    return res.status(400).json({message:"Feilds cannot be empty"})
  }
  if(typeof firstname !== "string "|| firstname.trim() === ""){
    return res.status(500).json({message:"First Name cannot be empty String"})
  }
  const check=await User.findOne({ $or :[{email},{mobileno}]})
  if(check){
    return res.status(500).json({message:" Account already exists"})
  }
   const user= await User.create({firstname,lastname,email,password,mobileno,role})
   return res.status(201).json({message:"Account Created",data:user})
}catch(err){
  return res.status(500).json({message:"error"})
}

}
const login = async (req,res) => {
  try {
    const {email, password} = req.body;
    if( !email || !password  === undefined) {
    return res.status(400).json({ message: "Fields cannot be empty"})
  }
  const checkUser = await User.findOne({email})
  if(!checkUser) {
        return res.status(409).json({ message: "Register Your Account First"})
  }
const matchPassword = password === checkUser.password
  if(!matchPassword) {
    return res.status(409).json({ message: "Invalid Credentials"})
  }
  return res.status(201).json({message: 'Log In  Successfull', data:checkUser})
 
  } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};
 
// const login= async(req,res)=>{
// try {
//   const{email,password}=req.body;
//   if(!email || !password){
//      return res.status(400).json({message:"Feilds cannot be empty"})
//   }
//     const check=await User.findOne({email })
//     if(!check){
//       return res.status(201).json({message:"Register The Account",data:email})
//     }
//     if(check.password==password){
//       return res.status(201).json({message:"Loged in Succesfully",data:check})
//     }
   
//   } catch (err) {
//     res.json({ status_code: 500, message: "Internal Server Error" });
//   }
// }
const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json({ message: "List of Users", data: getUsers });
  } catch (err) {
    res.json({ status_code: 500, message: "Internal Server Error" });
  }
};
module.exports={register,getAllUsers,login,update,deleteUser };