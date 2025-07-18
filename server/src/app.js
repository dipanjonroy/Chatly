const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ApiError = require("./utilities/error");
const { connectToDb } = require("./config/dbConfig");

const authRouter = require("./routers/authRouter")

//Database connection
connectToDb();

app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true}))

app.use(cors({
  orgin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"]
}))

app.use(cookieParser());

app.use("/api", authRouter)


//Error Handleing
app.use("/:path", (req,res,next)=>{
  next(new ApiError(404, "Page not found."))
});

app.use((err, req, res, next)=>{
  const {status = 500, message = "Internal server error"} = err;
  res.status(status).json({
    success: false,
    message
  })
})


module.exports = app;
