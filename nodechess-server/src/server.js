const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB =
  require("./config/database");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

/* DATABASE */

connectDB();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

/* TEST */

app.get("/", (req, res) => {

  res.send("NODECHESS SERVER RUNNING");

});

/* PORT */

const PORT =
  process.env.PORT || 5000;

/* START */

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});