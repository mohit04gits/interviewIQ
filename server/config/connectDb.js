import mongoose from "mongoose";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    console.log("Database connected");
  } catch (error) {
    console.log(`database error ${error}`);
  }
};

export default connectDb;