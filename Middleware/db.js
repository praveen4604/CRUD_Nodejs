const mongoose=require('mongoose');

const url='mongodb+srv://NCET:NCET_123@cluster0.7yb8v.mongodb.net/NCET?retryWrites=true&w=majority&appName=Cluster0'
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