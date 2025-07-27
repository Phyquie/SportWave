import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Optional: Increase timeout for slow networks
    });
    // console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error in MongoDB Connection", err);
  }
};

export default connectDB;
