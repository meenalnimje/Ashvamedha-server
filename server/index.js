const express = require("express");
const app = express();
const dbConnect = require("./dbConnect");
const dotenv = require("dotenv");
const adminRouter = require("./routers/adminRouter");
const collegeRouter = require("./routers/collegeRouter");
const matchRouter = require("./routers/matchRouter");
const userRouter = require("./routers/userRouter");
const sportsRouter = require("./routers/sportsRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config(".env");
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: `${process.env.BASE_URL}`,
  })
);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/college", collegeRouter);
app.use("/match", matchRouter);
app.use("/sport", sportsRouter);
const port = process.env.PORT;
dbConnect();
app.listen(port, () => {
  console.log(`server has started at the port ${port}`);
});
