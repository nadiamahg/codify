const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const request = require('request');
const teachers = require("./routes/api/teachers");
const students = require("./routes/api/students");
const classrooms = require("./routes/api/classrooms");
const assignments = require("./routes/api/assignments");
const path = require("path");

const app = express();
// Bodyparser middleware
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db, { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/teacherPassport")(passport);
require("./config/studentPassport")(passport);
// Routes
app.use("/api/teachers", teachers);
app.use("/api/students", students);
app.use("/api/classrooms", classrooms);
app.use("/api/assignments", assignments);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.post('/', async (req, res) => {
  let { script, language, stdin } = req.body;
  let program = {
    script,
    language,
    stdin,
    versionIndex: '2',
    clientId: 'd8610beb24aec706503e764669088478',
    clientSecret:
      'b937e48785b0ceda48485446cba27e56e8bfd4a93ad77592f826ef8e60ca7a88'
  };
  request(
    {
      url: 'https://api.jdoodle.com/v1/execute',
      method: 'POST',
      json: program
    },
    function(error, response, body) {
      if (!error) {
        res.send(response).status(200);
      } else {
        res.send(error).status(404);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));