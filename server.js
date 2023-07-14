const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://my-database:27017/test");
//미들웨어 순서주의
app.use(express.json());
const PORT = 8000;
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/", (req, res) => {
  console.log(req.body);
});
app.use("/api/products", routes);
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
