const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/studentData")
  .then(console.log("Database Connected!"))
  .catch((err) => console.log("Error Occured!", err));

const studentEntry = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  mobileNo: {
    type: String,
    required: true,
  },
});

const Students = mongoose.model("students", studentEntry);

app.post("/register", async (req, res) => {
  const { enrollmentNo, firstName, lastName, mobileNo } = req.body;
  if (!enrollmentNo || !firstName || !lastName || !mobileNo) {
    res.status(400).json({ msg: "Some required feild is empty!" });
  }
  try {
    const result = await Students.create({
      enrollmentNo,
      firstName,
      lastName,
      mobileNo,
    });
    console.log("Saved Student: ", result);
    res.status(201).json({ msg: "Success", data: result });
  } catch (err) {
    res.status(500).json({ msg: "Error in saving student!!", err });
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
