require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const exerciseRoutes = require("./routes/exerciseRoutes");
const userRoutes = require("./routes/userRoutes");
// const path = require('path')

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", exerciseRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Db connected and Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
