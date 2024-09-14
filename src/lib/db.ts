import mongoose, { ConnectOptions, Connection } from "mongoose";

const connectToDatabase = async (): Promise<Connection | undefined> => {
  const uri = process.env.MONGODB_URI;

  try {
    if (!uri) {
      throw new Error("MONGODB_URI is undefined");
    }

    // Connect only if the connection is not already established
    if (mongoose.connection.readyState === 0) {
      const connection = await mongoose.connect(uri, {
        dbName: process.env.MONGODB_DB,
      });

      console.log("Connected to the database");
      return connection.connection; // Return Mongoose connection object
    }

    return mongoose.connection; // Return existing Mongoose connection object
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default connectToDatabase;
