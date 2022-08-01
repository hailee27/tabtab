const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const cardRoute = require("./routes/card");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to Mongoose");
  }
);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/card", cardRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("backend server is running!");
});
