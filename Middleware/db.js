const mongoose=require('mongoose');

const url='mongodb url'
// mongoose.connect(url)
// .then(()=>{console.log('db connect')})
// .catch((err)=>{console.log('db error',err)});

const connectdb=async()=>{
    try{
        const db=await mongoose.connect(url);
        console.log('db connected');
    }
    catch(err){
        console.log(`db connection error`,err);

    }
}
module.exports=connectdb;
