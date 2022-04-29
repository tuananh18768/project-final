require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileUpload");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/user", require("./routers/userRoter"));
app.use("/trainer", require("./routers/trainerRole"));
app.use("/admin", require("./routers/adminRole"));
app.use("/api", require("./routers/upload"));
app.use("/api/conversations", require("./routers/conversations"));
app.use("/api/messages", require("./routers/messages"));
// app.use('/api', require('./routes/uploadIdeaRoute'))

//connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
    URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connect to mongodb");
    }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});