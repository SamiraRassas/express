const express = require("express");
var fs = require("fs");
const server = express();
server.use(express.static('public'));
server.get('/index.html', (req, res) => {
    res.sendFile(__dirname+"/"+ 'index.html');
  })

server.get("/students", (req, res) => {
  if (!req.query.name) {
    res.status(404).send("Name is not given");
  } else {
    let data = fs.readFileSync("students.json");
    let student = JSON.parse(data);
    let result = student.filter(
      (s) => s.name.toLowerCase() === req.query.name.toLocaleLowerCase()
    );
    console.log(Object.keys(result).length)
    console.log(result)
    
    if (result.length=== 0) {
      res.status(404).send("student " + req.query.name + " was not found");
    } else {
            res.status(200).send(result);  
    }
  }
});

server.listen(3000, () => {
  console.log("server is app and running on port 3000");
});
