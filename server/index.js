const express = require('express')
const cors = require('cors')
const path = require('path')

const { notFoundHandler, errorHandler } = require("./middlewares/common.errorHandler")

const app = express()
require("dotenv").config()

// built-in middleware
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))


// third-party middleware
app.use(express.json())

// static middleware
app.use(express.static(path.join(__dirname, "public")))



app.get("/", (req, res) => {
    res.send("Hello World!");
})

// Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/profile", require("./routes/profile"));

// Error handler
app.use(notFoundHandler);
app.use(errorHandler);


const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server has started on port ${PORT}`);
})

