const Router = require("express").Router;
const multer = require("multer");
const path = require("path");
const router = Router();
const Book = require("../models/books");
const Users = require("../models/users");
const fs = require("fs");
const sharp = require("sharp");


const TokenMiddleware = require("../middlewares/token.middleware");
const ProfileMiddleware = require("../middlewares/profile.middleware");
const ProfileService = require("../services/profile.service");

const { checkUser, checkPrivacy, checkAdmin, checkAdminOrUser } = new TokenMiddleware();
const { updateProfile, bookUploadValidation } = new ProfileMiddleware();
const profileService = new ProfileService();

// set up multer for image uploads
const storage = multer.diskStorage({
    destination: "./public/uploads/book_image/",
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
router.post("/books/add_book", checkUser, upload, bookUploadValidation, async (req, res) => {
    try {
        const { title, author, description, status } = req.body;
        const userId = req.decodedUser.user._id;

        // Compress and resize the image before saving
        if (req.file) {
            const compressedImage = await sharp(req.file.path)
                .resize(800, 800) // You can adjust the dimensions as needed
                .jpeg({ quality: 80 }) // Adjust the quality to achieve the desired file size
                .toBuffer();

            const compressedFilename = req.file.fieldname + "-" + Date.now() + ".jpg"; // Using JPEG format
            const destinationPath = path.join("./public/uploads/book_image/", compressedFilename);

            fs.writeFileSync(destinationPath, compressedImage);
            fs.unlinkSync(req.file.path); // Delete the original file

            const newBook = new Book({
                title,
                author,
                description,
                image: compressedFilename,
                status,
                user: userId,
            });

            const savedBook = await newBook.save();

            res.json({
                status: "success",
                message: "Book added successfully.",
                book: savedBook,
            });
        } else {
            res.status(400).json({
                status: "error",
                message: "No image file uploaded."
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "error",
            message: "An error occurred while adding the book."
        });
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

// get single book route
router.get("/books/:id", checkUser, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('user', 'username department'); // Populate the 'user' field with 'username' and 'department'
        res.json({
            status: "success",
            message: "Book fetched successfully.",
            book,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "error",
            message: "An error occurred while fetching book.",
        });
    }
});




module.exports = router;