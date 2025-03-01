import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then
    (()=>console.log("Mongo DB Connected")).catch(err=>console.error("Error in Mongo DB Connection", err))

   
}

export default connectDB;
