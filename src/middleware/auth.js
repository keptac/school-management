const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({sucess:false, message:"A token is required for authentication"});
    }
    try {
        // return res.status(401).send({sucess:false, message:"A token is required for authentication"});
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        console.log(req.user);
    } catch (err) {
        return res.status(401).send({sucess:false, message:"A token is required for authentication"});
    }
    return next();
};

module.exports = verifyToken;