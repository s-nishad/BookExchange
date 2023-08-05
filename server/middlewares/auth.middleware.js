const jwt = require("jsonwebtoken");

class AuthMiddleware {
    async checkUser(req, res, next) {
       try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    status: "failed",
                    message: "Access denied. No token provided.",
                });
            }
            const decodedUser = jwt.decode(token, process.env.JWT_SECRET);
            
            if (!decodedUser) {
                return res.json({
                    status: "failed",
                    message: "Invalid token.",
                });
            }
            
            next();
        } catch (err) {
            console.log(err.message);
            console.log(err);
            res.json({
                code: 500,
                status: "failed",
                message: "Internal server error. No token provided.",
            })
       } 
    }

    async checkAdmin(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    status: "failed",
                    message: "Access denied. No token provided.",
                });
            }

            const decodedUser = jwt.decode(token, process.env.ADMIN_JWT_SECRET);

            if (!decodedUser) {
                return res.json({
                    status: "failed",
                    message: "Invalid token.",
                });
            }

            // make sure the user is admin
            if (decodedUser.user.email !== process.env.ADMIN_EMAIL) {
                return res.json({
                    status: "failed",
                    message: "Invalid token.",
                });
            }

            next();
        } catch (err) {
            console.log(err.message);
            res.json({
                code: 500,
                status: "failed",
                message: err.message,
            })
       } 
    }

    async checkAdminOrUser(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.json({
                    status: "failed",
                    message: "Access denied. No token provided.",
                });
            }
            
            // decode token as admin
            const decodedAdmin = jwt.decode(token, process.env.ADMIN_JWT_SECRET);

            // decode token as user
            const decodedUser = jwt.decode(token, process.env.JWT_SECRET);

            // check if token is valid
            if (!decodedAdmin && !decodedUser) {
                return res.json({
                    status: "failed",
                    message: "Invalid token.",
                });
            }
            
            // check admin or user
            decodedAdmin ? req.user = decodedAdmin.user : req.user = decodedUser.user;

            next();
        } catch (err) {
            console.log(err.message);
            res.json({
                code: 500,
                status: "failed",
                message: err.message,
            });
       }
    }
}

module.exports = AuthMiddleware;