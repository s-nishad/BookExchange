const express = require("express");
const router = express.Router();
const Users = require("../models/users");

// update profile route
router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const { email } = req.body;

        // check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.json({
                status: "failed",
                message: "Please enter a valid email address.",
            });
        }

        // Check if the new email is already in use by other users
        const existingUser = await Users.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
            return res.json({
                status: "failed",
                message: "This email is already in use by another user.",
            });
        } else {
            // Update the profile
            const updatedUser = await Users.findByIdAndUpdate(userId, { $set: req.body }, { new: true });

            res.json({
                status: "success",
                message: "Profile updated successfully.",
                data: updatedUser,
            });
        }

    } catch (error) {
        console.error(error);
        res.json({
            status: "failed",
            message: "Something went wrong.",
        });
    }
});

// get user profile route
router.get("/:id", async (req, res) => {
    try {
        console.log(req.body);
        const user = await Users.findById(req.params.id);

        if (!user) {
            return res.json({
                status: "failed",
                message: "User not found.",
            });
        }

        res.json({
            status: "success",
            message: "Profile fetched successfully.",
            data: user,
        });

    } catch (error) {
        console.error(error);
        res.json({
            status: "failed",
            message: "Something went wrong.",
        });
    }
});

// delete user profile route
router.delete("/:id", async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            message: "Profile deleted successfully.",
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