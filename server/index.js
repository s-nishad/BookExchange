const express = require('express')
const cors = require('cors')
const app = express()

require("dotenv").config()

app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/profile", require("./routes/profile"));

const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server has started on port ${PORT}`);
})

