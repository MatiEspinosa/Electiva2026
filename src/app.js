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

app.use(express.json());
app.use(loggerMiddleWare);
app.use(morgan("dev"));
app.use(cors());

app.use("/", publicRouter);
app.use("/v1/auth", authRouter);

app.use(authMiddleware);

// Private
app.use("/v1", privateRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listen & serve PORT: ${PORT}`);
});
