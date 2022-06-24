require("dotenv").config("./config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Essential Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});