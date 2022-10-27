const express = require("express");
var fs = require("fs");
const server = express();
var bodyParser = require("body-parser");
let data = fs.readFileSync("students.json");
let student = JSON.parse(data);
var jsonParser = bodyParser.json();
const cors = require("cors");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
server.use(cors());
// server.use(jsonParser);
// server.use(urlencodedParser);
const dataPath = "./studentsnew.json";
const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};
const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

server.use((error, req, res, next) => {
  // Error handling middleware functionality
  if (res.headersSent) {
    //Check if a response has been sent
    return next(error);
  }
  res.status(error.console || 500);
  res.json({ message: error.message || "An error has occured!" });
  //   console.log( `error ${message}`) // log the error
  //  status = status || 500
  //   response.status(status).send(message);
});

server.get("/students", (req, res) => {
  if (!req.query.id) {
    // res.status(404).send("user ID is not given!");

    res.status(200).send(student);
  } else {
    let result = student.find((s) => s.id === req.query.id);
    if (!result) {
      res
        .status(404)
        .send("the user with id " + req.query.id + " record was not found");
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      });
    } else {
      res.status(200).send(result);
    }
  }
});


server.get("/student/courses", (req, res) => {
  if (!req.query.id) {
    res.status(404).send("user ID is not given!");
  } else {
    // read user id
    let courseData = fs.readFileSync("courses.json");
    let data = fs.readFileSync("studentcourses.json"); //check in which courses he is registered
    let courseid = JSON.parse(data);
    let result = courseid.filter((s) => s.studentid === req.query.id);
    var r = getStudentCourses(result);
    console.log(">>>>" + JSON.stringify(r));
    if (r.length == 0) {
      res
        .status(404)
        .send("the user with id " + req.query.id + " record was not found");
    } else {
      res.status(200).send(r);
    }
  }
});

const getStudentCourses = (studentCoursesIds) => {
  var cDetails = [];
  let coursesDetails = studentCoursesIds.forEach((studentCourse) => {
    cDetails.push(getStudentCourseDetails(studentCourse.courseid));
  });
  return cDetails;
};

const getStudentCourseDetails = (courseId) => {
  let courseData = fs.readFileSync("courses.json");
  let courses = JSON.parse(courseData);
  let courseDetail = courses.find((course) => course.id === courseId);
  return courseDetail;
};
server.delete("/student/:id", (req, res, next) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    var existAccounts = getAccountData();
    const userId = req.params["id"];
    if (!userId) {
      const error = new Error(`user ID is not given`);
      next(error);
    } else {
      let result = existAccounts[userId];
      if (!result) {
        const error = new Error(`user ID doesn't exist in file!`);
        next(error);
        // next("user ID doesn't exist in file!",400);
      } else {
        delete existAccounts[userId];
        saveAccountData(existAccounts);
        res.send(`accounts with id ${userId} has been deleted`);
      }
    }
  });
});

server.put("/student/:id", jsonParser, (req, res) => {
  var existAccounts = getAccountData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const userId = req.params["id"];
      if (!userId) {
        next("user ID is not given!", 404);
      } else {
        response = {
          name: req.body.name,
          operation: req.body.operation,
          email: req.body.email,
        };
        existAccounts[userId] = response;
        console.log(">>>>" + JSON.stringify(response));
        saveAccountData(existAccounts);
        res.send(`accounts with id ${userId} has been updated`);
      }
    },
    true
  );
});

server.listen(3000, () => {
  console.log("server is app and running on port 3000");
});
