
import mongoose from "mongoose"
const mongoURI=process.env.DB_URL;
export const ConnectDB=async()=>{
    await mongoose.connect(mongoURI);

    console.log("DB connetced")
}

// mongodb+srv://rajputsundram87:<db_password>@noteshala.a8bi0.mongodb.net/