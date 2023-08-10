const jwt = require("jsonwebtoken");
const Users = require("../models/users");

class TokenMiddleware {
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

            req.decodedUser = decodedUser;

            next();

        } catch (err) {
            console.log(err.message);
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
            if (!decodedAdmin || !decodedUser) {
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
        }
    }

    async checkPrivacy(req, res, next) {
        try {
            const currentUser = await Users.findById(req.params.id);

            if (!currentUser) {
                return res.json({
                    status: "failed",
                    message: "User not found.",
                });
            }

            if (currentUser._id.toString() !== req.decodedUser.user._id) {
                return res.json({
                    status: "failed",
                    message: "Access denied.",
                });
            }

            next();

        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = TokenMiddleware;