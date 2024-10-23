const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract token
    // console.log("Auth Header:", authHeader);  // Log the full header
    // console.log("Token extracted:", token);   // Log the token only

    if (!token) return res.sendStatus(401);  // If no token provided

    jwt.verify(token, "bookstore123", (err, user) => {
        if (err) {
            console.log("Token verification error:", err);  // Log the error
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


module.exports= { authenticateToken };