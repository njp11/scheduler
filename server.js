const express = require("express");
const Schedule = require("./models/Schedule");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect Database
connectDB();

// handling first time load of the application
app.get("/schedule", (req, res) => {
  try {
    Schedule.findOne({}, (err, result) => {
      if (err) throw err;
      result ? res.json(result) : res.status(404).send("No data found");
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// handling post updated schedule
app.post("/", (req, res) => {
  try {
    Schedule.findOne({}, function (err, result) {
      if (err) throw err;
      result && result.delete();
    });
    const schedule = new Schedule({
      ...req.body,
    });
    schedule.save();
    res.json({ msg: "Schedule progress successfully saved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
