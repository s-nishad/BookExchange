const { Router } = require('express');
const router = Router();
const Users = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register route
router.post("/register", async (req, res) => {
    try {
        const { fullname, email, department, username, password } = req.body;

        if (!username || !password || !fullname || !email || !department) {
           return res.json({
                status: "failed",
                message: "Please enter all required fields.",
           })
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



        if (password.length < 6) {
            return res.json({
                status: "failed",
                message: "Please enter a password of at least 6 characters.",
            });
        }

        if (username.length < 4 || username.length > 10) {
            return res.json({
                status: "failed",
                message: "Please enter a username of at least 4 characters and at most 10 characters.",
            });
        }

        const existingUser = await Users.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

        if (existingUser) {
            return res.json({
                status: "failed",
                message: "Username already exists.",
            });
        }

        const existingEmail = await Users.findOne({ email });

        if (existingEmail) {
            return res.json({
                status: "failed",
                message: "Email already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            username,
            password: hashedPassword,
            fullname,
            email,
            department,
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.json({
            user: savedUser,
            status: "success",
            message: "User has been registered successfully",
            token,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        if (!email && !username) {
            return res.json({
                status: "failed",
                message: "Please enter either email or username.",
            });
        }
        
        if (!password) {
            return res.json({
                status: "failed",
                message: "Please enter your password.",
            });
        }

        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });

        if (!existingUser) {
            return res.json({
                status: "failed",
                message: "Invalid Credential",
            });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!passwordCorrect) {
            return res.json({
                status: "failed",
                message: "Invalid Credential",
            });
        }

        const token = jwt.sign({ user: existingUser }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.json({
            user: existingUser,
            status: "success",
            message: "User has been logged in successfully",
            token,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
});

// Admin Login route
router.post("/admin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                status: "failed",
                message: "Please enter all required fields.",
            });
        }

        if (email !== process.env.ADMIN_EMAIL) {
            return res.json({
                status: "failed",
                message: "Invalid Credential",
            });
        }


        const passwordCorrect = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

        if (!passwordCorrect) {
            return res.json({
                status: "failed",
                message: "Invalid Credential",
            });
        }

        const token = jwt.sign({user: {email, password}}, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            status: "success",
            message: "Admin has been logged in successfully",
            token,
        });

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;
