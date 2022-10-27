const express = require("express");
const server = express();
server.use(
  (req, res, next) => {
    console.log("M1");
    next();
  },)
  server.use((req, res) => {
    res.send(
      `<div>
        <h2>WELCOME</h2>
        <h5>use Middleware</h5>
      </div>`
    );
  }
);
// server.get('/about',(req,res) => {
//     res.send(
//     "about")
//     })
server.listen(3000, () => {
    console.log("server is app and running on port 3000");
  });