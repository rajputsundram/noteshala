import mongoose from "mongoose";
const connect =async()=>{
    if(mongoose.connection(0).readyState) return;

    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("mongo connection is done");
    }
    catch{
        throw new Error("Error Connecting to mongoose");
    }
}
export default connect;