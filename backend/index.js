const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");
const userRoute = require("./routes/user.route");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const connectedDB = require("./db/connect");
connectedDB();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/v1", userRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  console.log(path.join(__dirname));
});

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
