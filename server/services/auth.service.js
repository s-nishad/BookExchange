const Users = require("../models/users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
    async register(data) {
        try {
            const { fullname, email, department, username, password } = data;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await new Users({
                username,
                password: hashedPassword,
                fullname,
                email,
                department,
            });

            const user = await newUser.save();

            const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });

            return ({
                status: "success",
                message: "User has been registered successfully",
                user,
                token,
            });

        } catch (err) {
            console.error(err.message);
        }
    }

    async login(data) {
        try {
            const { email, username, password } = data;

            const user = await Users.findOne({ $or: [{ username }, { email }] });

            const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });

            return ({
                status: "success",
                message: "User has been logged in successfully",
                user,
                token,
            });

        } catch (err) {
            console.error(err.message);
        }
    }

    async admin(data) {
        try {
            const { email, password } = data;

            const token = jwt.sign({ user: { email, password } }, process.env.JWT_SECRET, { expiresIn: '24h' });

            return ({
                status: "success",
                message: "Admin has been logged in successfully",
                token,
            });

        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = AuthService;