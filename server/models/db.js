const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to database");
} catch (err) {
    console.log(err);
}

module.exports = mongoose