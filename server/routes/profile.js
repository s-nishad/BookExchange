const Router = require("express").Router;
const router = Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const AuthMiddleware = require("../middlewares/auth.middleware");

const authMiddleware = new AuthMiddleware();

// Update profile route
router.put("/:id", authMiddleware.checkAdminOrUser, async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.json({
                status: "failed",
                message: "Token not provided.",
            });
        }

        const decodedUser = jwt.decode(token, process.env.JWT_SECRET);

        if (!decodedUser) {
            return res.json({
                status: "failed",
                message: "Invalid token or missing user information.",
            });
        }

        const currentUser = await Users.findById(req.params.id);

        if (!currentUser) {
            return res.json({
                status: "failed",
                message: "User not found.",
            });
        }

        // decodedUser is already a string, so no need to convert it to string
        if (currentUser._id.toString() !== decodedUser.user._id) {
            return res.json({
                status: "failed",
                message: "You are not authorized to perform this action.",
            });
        }

        const { fullname, email, department, username } = req.body;

        if (!username || !fullname || !email || !department) {
            return res.json({
                status: "failed",
                message: "Please enter all required fields.",
            })
        }

        const existProfile = await Users.findById(req.params.id);

        if (existProfile.username === username && existProfile.email === email && existProfile.fullname === fullname && existProfile.department === department) {
            return res.json({
                status: "failed",
                message: "No changes were made.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                status: "failed",
                message: "Please enter a valid email address.",
            });
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            return res.json({
                status: "failed",
                message: "Username must contain only alphanumeric characters and no spaces.",
            });
        }

        const existingUser = await Users.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
        const existingEmail = await Users.findOne({ email });

        if (existProfile.username !== username) {
            if (existingUser) {
                return res.json({
                    status: "failed",
                    message: "Username already exists.",
                });
            }
        }
        
        if (existProfile.email !== email) {
            if (existingEmail) {
                return res.json({
                    status: "failed",
                    message: "Email already exists.",
                });
            }
        }

        const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });


        return res.json({
            status: "success",
            message: "Profile updated successfully.",
            user: updatedUser,
        });

    } catch (err) {
        console.log(err.message);
        return res.json({
            status: "failed",
            message: err.message,
        });
    }
});

// Get profile route
router.get("/:id", authMiddleware.checkUser, async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.json({
                status: "failed",
                message: "User not found.",
            });
        }
        return res.json({
            status: "success",
            message: "User fetched successfully.",
            user: user,
        });

    } catch (error) {
        console.log(error.message);
        return res.json({
            status: "failed",
            message: error.message,
        });
    }
});

// Get all users route
router.get("/get/all", authMiddleware.checkAdmin,  async (req, res) => {
    try {
        const users = await Users.find();
        res.json({
            status: "success",
            message: "Users fetched successfully.",
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "failed",
            message: "Something went wrong.",
        });
    }
});



module.exports = router;