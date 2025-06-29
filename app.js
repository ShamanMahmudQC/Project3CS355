const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const { connectDB } = require("./models/db");

const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));


app.use(require("./routes/auth"));
app.use(require("./routes/quiz"));

app.get("/", (req, res) => res.redirect("/login.html"));


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
