const Router = require("express").Router;
const router = Router();

const TokenMiddleware = require("../middlewares/token.middleware");
const ProfileMiddleware = require("../middlewares/profile.middleware");
const ProfileService = require("../services/profile.service");

const { checkUser, checkPrivacy, checkAdmin, checkAdminOrUser } = new TokenMiddleware();
const { updateProfile } = new ProfileMiddleware();
const profileService = new ProfileService();

// Update profile route
router.put("/:id", checkUser, checkPrivacy, updateProfile, async (req, res) => {
    try {
        const result = await profileService.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message);
    }
});

// Get profile route
router.get("/:id", checkUser, checkPrivacy, async (req, res) => {
    try {
        const result = await profileService.getProfile(req.params.id);
        res.json(result);
    } catch (error) {
        console.log(error.message);
    }
});

// Get all users route
router.get("/get/all", checkAdminOrUser, async (req, res) => {
    try {
        const result = await profileService.getAllUsers();
        res.json(result);
    } catch (error) {
        console.log(error.message);
    }
});


module.exports = router;