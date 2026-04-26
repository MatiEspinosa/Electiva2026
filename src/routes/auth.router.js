const express = require("express");
const authRouter = express.Router();

const payloadMiddleWare = require("../middlewares/paylod.middleware");
const { postAuthLogin, postAuthSingup } = require("../controllers/auth.controller")

const { signupSchema, loginSchema } = require("./validations/auth.validation")

authRouter.post("/signup", payloadMiddleWare(signupSchema), postAuthSingup);
authRouter.post("/login", payloadMiddleWare(loginSchema), postAuthLogin);

module.exports = authRouter;