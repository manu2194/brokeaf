var express = require("express");
var mongoose = require("mongoose");
const expenseItems = require("./routes/api/expenseItems");
const path = require("path");
const login = require("./routes/api/login");
const app = express();

//Bodyparser middleware
app.use(express.json());
//DB Config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, (Option = { useNewUrlParser: true }))
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/expenses", expenseItems);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set Static Folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
