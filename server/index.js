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

app.use("/auth", require("./routes/auth"))


const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server has started on port ${PORT}`);
})

