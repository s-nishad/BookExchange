const Users = require("../models/users");

class ProfileService {
    async update(id, user) {
        try {
            const updatedUser = await Users.findByIdAndUpdate(id, {
                $set: user,
            }, { new: true });

            return ({
                status: "success",
                message: "Profile updated successfully.",
                user: updatedUser,
            });

        } catch (err) {
            console.log(err.message);
        }
    }

    async getProfile(id) {
        try {
            const user = await Users.findById(id);

            if (!user) {
                return res.json({
                    status: "failed",
                    message: "User not found.",
                });
            }
            return ({
                status: "success",
                message: "User fetched successfully.",
                user,
            });

        } catch (error) {
            console.log(error.message);
        }
    }

    async getAllUsers() {
        try {
            const users = await Users.find();

            if (!users) {
                return({
                    status: "failed",
                    message: "No users found.",
                });
            }

            return({
                status: "success",
                message: "Users fetched successfully.",
                users,
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ProfileService;