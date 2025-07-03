const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    firstname:{type: String,required:true},
    lastname:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobileno:{type:Number},
    isactive:{type:Boolean,default:true},
    role:{type:String ,enum:["Admin","User"]},
    CreatedAt:{type:Date}

},{timestamps:true},{strict:true})
module.exports=mongoose.model('user',userschema);