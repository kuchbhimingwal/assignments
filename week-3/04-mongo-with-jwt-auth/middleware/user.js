
const jwt = require('jsonwebtoken');
const jwtKey = require("../index")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const tokenIn = req.headers.authorization;
    const token = tokenIn.substring(7);
    console.log(tokenIn);

    try {
        jwt.verify(token, jwtKey);
        next();
    } catch (error) {
        res.status(404).json({error: "not verified"})
    }
}

module.exports = userMiddleware;