var express = require("express");
var mongoose = require("mongoose");
const expenseItems = require("./routes/api/expenseItems");
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

// app.get("/api/customers", (req, res) => {
//   const customers = [
//     { id: 1, firstName: "John", lastName: "Doe" },
//     { id: 2, firstName: "Brad", lastName: "Traversy" },
//     { id: 3, firstName: "Mary", lastName: "Swanson" }
//   ];

//   res.json(customers);
// });

app.use("/api/expenses", expenseItems);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
