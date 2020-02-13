//this is file which runs the server written in javascript and calls your python file to execute
//you need nodejs install it from here https://nodejs.org/en/
// after installing open this folder in sublime
// open node js command prompt at this folder path which is same like command prompt in windows
// to open open js command propmpt just type node.js in search box
//then run "npm install" which install all the required modules needed to run this server
// after setting all of this do run "node index.js"
//make sure that above command should run on node.s command prompt open at folder path

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const spawn = require("child_process").spawn;

const app = express();

app.use(bodyparser());

app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<h1>Server is on do send json object data to localhost:8080/model</h1>"
  );
});

app.get("/model", (req, res) => {
  if (req.body["parameter1"] && req.body["parameter2"]) {
    var data = req.body;
    const process = spawn("python", [
      "./importModel.py",
      data["parameter1"],
      data["parameter2"]
    ]); // this step calls your python file to execute
    process.stdout.on("data", function(data) {
      res.send({ python_result: data.toString() });
    }); // this step capture your python output and display it to user via this server
  } else {
    res.send({
      error: 1,
      description: "all parameter need to pass"
    });
  }
});

app.listen(8080, () => {
  console.log("server is running in the port 8080");
});

//reference_link= https://www.geeksforgeeks.org/run-python-script-node-js-using-child-process-spawn-method/
