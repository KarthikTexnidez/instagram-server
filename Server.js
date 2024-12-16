const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require('./model/model')
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://texnidez3d:XtqsFc4GUnhiuJcV@datastroringcluster.gcgku.mongodb.net/?retryWrites=true&w=majority&appName=datastroringcluster/test");

app.post("/", (req, res) => {
  console.log("Result is ", req.body)
  const { firstinput, password } = req.body;
  db
    .findOne({ firstinput: firstinput })
    .then((user) => {
      if (user) {
        if (user.password === password && user.firstinput === firstinput) {
          res.json("success");
        } else {
          res.json("The Password is incorrect");
        }
      } else {
        res.json("No Records Exist");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occurred");
    });
});

app.post("/entry", (req, res) => {
  db
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});



app.get("/", (req, res) => {
  const { firstinput } = req.query; // Extract `firstinput` from query parameters

  if (!firstinput) {
    return res.status(400).json({ message: "firstinput is required" });
  }

  db
    .findOne({ firstinput: firstinput }) // Search for the user with `firstinput`
    .then((user) => {
      if (user) {
        res.json(user); // Send the user data to the frontend
      } else {
        res.status(404).json({ message: "No Records Exist" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    });
});

app.listen(8080, () => {
  console.log("Server is connected");
});
