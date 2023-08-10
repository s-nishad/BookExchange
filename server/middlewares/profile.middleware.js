const Users = require("../models/users");
const jwt = require('jsonwebtoken');

class ProfileMiddleware {
    async updateProfile(req, res, next) {
        try {
            const { fullname, email, department, username } = req.body;

            if (!username || !fullname || !email || !department) {
                return res.status(400).json({
                    status: "failed",
                    message: "Please enter all required fields.",
                });
            }

            const existProfile = await Users.findById(req.params.id);

            if (
                existProfile.username === username &&
                existProfile.email === email &&
                existProfile.fullname === fullname &&
                existProfile.department === department
            ) {
                return res.status(400).json({
                    status: "failed",
                    message: "No changes were made.",
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    status: "failed",
                    message: "Please enter a valid email address.",
                });
            }

            const usernameRegex = /^[a-zA-Z0-9]+$/;
            if (!usernameRegex.test(username)) {
                return res.status(400).json({
                    status: "failed",
                    message: "Username must contain only alphanumeric characters and no spaces.",
                });
            }

            const existingUser = await Users.findOne({
                username: { $regex: new RegExp(`^${username}$`, 'i') },
            });
            const existingEmail = await Users.findOne({ email });

            if (existProfile.username !== username) {
                if (existingUser) {
                    return res.status(400).json({
                        status: "failed",
                        message: "Username already exists.",
                    });
                }
            }

            if (existProfile.email !== email) {
                if (existingEmail) {
                    return res.status(400).json({
                        status: "failed",
                        message: "Email already exists.",
                    });
                }
            }

            // If all validations pass, proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                status: "error",
                message: "An internal server error occurred.",
            });
        }
    }
}

module.exports = ProfileMiddleware;
