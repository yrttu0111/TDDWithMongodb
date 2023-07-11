const express = require("express");
const routes = require("./src/routes/routes");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://my-database:27017/test");

app.use("/api/products", routes);

const PORT = 8000;
const HOST = "0.0.0.0";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
