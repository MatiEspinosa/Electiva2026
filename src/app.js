require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const loggerMiddleWare = require("./middlewares/logger.middleware");
const authMiddleware = require("./middlewares/auth.middlewre");

const privateRouter = require("./routes/private.router");
const publicRouter = require("./routes/public.router");
const authRouter = require("./routes/auth.router");

const connectMongoDB = require("./models/mongo.client");
const connectToRedis = require("./services/redis.service");

let servicesInitialized = false;
let servicesInitializationPromise = null;

const initializeServices = async () => {
  if(servicesInitialized){
    return;
  }

  if(!servicesInitializationPromise) {
    servicesInitializationPromise = (async () => {
      await connectMongoDB();
      connectToRedis();
      servicesInitialized = true;
      console.log("Servicios inicializados correctamente");
    }).catch((error) => {
      servicesInitializationPromise = null;
      throw error;
    });
  }

  return servicesInitializationPromise;
}
/* 

//Conexion a Mongo DB
(async () => {
  try {
    await connectMongoDB();
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    process.exit(1);
  }
})();

//Conexion a Redis
(async () => {
  try {
    await connectToRedis();
    console.log("Conexion a Redis establecida correctamente.");
  } catch (error) {
    console.log(
      "Ha ocurrido un error al intentarse conectarse a Redis: ",
      error,
    );
    process.exit(1);
  }
})();
 */
app.use(express.json());
app.use(loggerMiddleWare);
app.use(morgan("dev"));
app.use(cors());

app.use(async (req, res, next) => {
  try{
    await initializeServices();
    next();
  }catch (error) {
    console.log("No se pudieron inicializar los servicios", error);
    res.status(500).json({
      error: "No se pudieron inicializar los servicios"
    });
  }
});

app.use("/", publicRouter);
app.use("/v1/auth", authRouter);

app.use(authMiddleware);

// Private
app.use("/v1", privateRouter);


module.exports = app;