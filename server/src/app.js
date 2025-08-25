const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ApiError = require("./utilities/error");
const { connectToDb } = require("./config/dbConfig");
const serverless = require("serverless-http");

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const uploadFileRouter = require("./routers/uploadFileRouter");
const chatRouter = require("./routers/chatRouter");

//Database connection
connectToDb();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

const allowOrigins = [
  "http://localhost:4000",
  "https://chatly-fgju.vercel.app",
];

app.use(
  cors({
    origin: (origin, cb)=>{
      if(!origin || origin.includes(origin)){
        cb(null, true)
      } else {
        callback(new ApiError(501, "CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", uploadFileRouter);
app.use("/api", chatRouter);

//Error Handleing
app.use("/:path", (req, res, next) => {
  next(new ApiError(404, "Page not found."));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({
    success: false,
    message,
  });
});

module.exports = app;

module.exports.handler = serverless(app);
