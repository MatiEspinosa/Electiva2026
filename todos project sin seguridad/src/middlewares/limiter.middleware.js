const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite por cada IP de 100 requests por "window" (aqui, por 15 minutos)
    message: "Too many requests from this IP, please try again after 15 minutes",
});

module.exports = limiter;