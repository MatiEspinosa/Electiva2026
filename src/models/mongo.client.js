const mongoose = require("mongoose");

const connectMongoDb = async () => {
  const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
  const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
  const MONGODB_CONNECTION_TIME = process.env.MONGODB_CONNECTION_TIME
  
  await mongoose.connect(`${MONGODB_CONNECTION_STRING}`,
    {
        serverSelectionTimeoutMS: MONGODB_CONNECTION_TIME,
        dbName:MONGODB_DATABASE_NAME
    }
  );
  console.log("Conexion a Mongo db establecida correctamente");
};

module.exports = connectMongoDb;