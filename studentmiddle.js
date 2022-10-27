const express = require("express");
var fs = require("fs");
const server = express();

server.use(
    (req, res, next) => {
        if (!req.query.name) {
            res.status(400).send("Name is not given!");
          } else {
            let data = fs.readFileSync("user.json");
            let student = JSON.parse(data);
            let result = student.filter(
              (s) => s.username.toLowerCase() === req.query.name.toLocaleLowerCase()
            );
            console.log(result)
            
            if (result.length=== 0) {
              res.status(400).send("student " + req.query.name + " was not found");
            } else {
                   // res.status(200).send(result);
                   res.result=result;
                      next(); 
            }
          }
    
    })
    server.use((req, res) => {
        res.send( res.result);
    }
  );



server.listen(3000, () => {
  console.log("server is app and running on port 3000");
});
