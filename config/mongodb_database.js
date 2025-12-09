import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error(" MongoDB Connection Failed:", err.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => console.warn("MongoDB Disconnected"));
  mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));
};

export default connectMongoDB;
