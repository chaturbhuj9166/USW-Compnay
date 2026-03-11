import mongoose from "mongoose";

const connectDB = async () => {
  try {

    await mongoose.connect(
      "mongodb://chaturbhuj2:chaturbhuj9166joshi@ac-6nduxom-shard-00-00.qlksk1w.mongodb.net:27017,ac-6nduxom-shard-00-01.qlksk1w.mongodb.net:27017,ac-6nduxom-shard-00-02.qlksk1w.mongodb.net:27017/?ssl=true&replicaSet=atlas-bq7uqy-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log("MongoDB Connected");

  } catch (error) {
    console.log(error);
  }
};

export default connectDB;