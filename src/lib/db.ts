import mongoose, { ConnectOptions, Connection } from "mongoose";

const connectToDatabase = async (): Promise<Connection | undefined> => {
  const uri =
    "mongodb+srv://csen-dz:csenblida@csen-users.57mosti.mongodb.net/csenUsers?retryWrites=true&w=majority";

  try {
    if (!uri) {
      throw new Error("MONGODB_URI is undefined");
    }

    // Connect only if the connection is not already established
    if (mongoose.connection.readyState === 0) {
      const connection = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGODB_DB,
      } as ConnectOptions);

      console.log("Connected to the database");
      return connection.connection; // Return Mongoose connection object
    } else {
      console.log("Already connected to the database");
      return mongoose.connection; // Return existing Mongoose connection object
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
export default connectToDatabase;
