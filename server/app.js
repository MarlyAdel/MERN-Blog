
const express = require("express");

const connectToDB = require("./config/connectToDB");
require("dotenv").config();
const {errorHandler, notFound} = require("./middlewares/error");
const cors = require("cors");
const {xss} = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");



//~ Init App
const app = express();

//~ Connection To Database 
connectToDB();

//~ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//~ Security Headers (helmet)
app.use(helmet());

//~ Prevent HTTP Param Pollution
app.use(hpp());

//~ Prevent XSS (Cross Site Scripting) Attacks
app.use(xss());

//~ Express Rate Limit
app.use(rateLimit({
    windowMs: 10 * 60 * 1000, //10mins
    max: 100,
}));

//~ Cors Policy
app.use(cors({
  origin: "https://mern-blog-tau-weld.vercel.app",
  credentials: true
}))

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

//~ Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/password", require("./routes/passwordRoute"));


//~ Error Handler Middleware
app.use(notFound);
app.use(errorHandler);




//~ Running Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running in ${process.env.NODE_ENV} on Port ${PORT}`))


module.exports = app;

