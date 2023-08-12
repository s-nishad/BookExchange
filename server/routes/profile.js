const Router = require("express").Router;
const multer = require("multer");
const path = require("path");
const router = Router();
const Book = require("../models/books");
const Users = require("../models/users");

const TokenMiddleware = require("../middlewares/token.middleware");
const ProfileMiddleware = require("../middlewares/profile.middleware");
const ProfileService = require("../services/profile.service");

const { checkUser, checkPrivacy, checkAdmin, checkAdminOrUser } = new TokenMiddleware();
const { updateProfile } = new ProfileMiddleware();
const profileService = new ProfileService();

// set up multer for image uploads
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }
})

const upload = multer({
    storage: storage,
}).single("image");


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

// add books route
router.post("/books/add_book", checkUser, upload, async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "Please upload an image.",
            });
        }

        const { title, author, description, status } = req.body;
        const userId = req.decodedUser.user._id;


        const newBook = new Book({
            title,
            author,
            description,
            image: req.file.filename,
            status,
            user: userId,
        });

        const savedBook = await newBook.save();

        res.json({
            status: "success",
            message: "Book added successfully.",
            book: savedBook,
        });

    } catch (error) {
        console.log(error.message);
    }
});

// get my books route
router.get("/books/my_books", checkUser, async (req, res) => {
    try {
        const userId = req.decodedUser.user._id;
        const books = await Book.find({ user: userId }).populate("user", ["name", "email", "department"]);
        res.json({
            status: "success",
            message: "Books fetched successfully.",
            books,
        });
    } catch (error) {
        console.log(error.message);
    }
});

// get all books route
router.get("/books/get_books", checkUser, async (req, res) => {
    try {
        const allBooks = await Book.find().populate('user', 'username department'); // Populate the 'user' field with 'username' and 'department'
        res.json({
            status: "success",
            message: "All books fetched successfully.",
            books: allBooks,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "error",
            message: "An error occurred while fetching books.",
        });
    }
});



module.exports = router;