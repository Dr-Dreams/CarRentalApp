import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.mongo_url);
    const connection = mongoose.connection;

    connection.on('connnected', () => {
      console.log("MongoDB connection successfully!");
    });

    connection.on('error', (error) => {
      console.log(`MongoDB connection failed!.\n Error :- ${error}`);
    })
  } catch (error) {
    console.log(error);
  }
}
