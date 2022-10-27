const express = require("express");
const server = express();
server.get(
  "/",
  (req, res, next) => {
    console.log("hello");
    next();
  },
  (req, res) => {
    res.send(
      `<div>
        <h2>WELCOME</h2>
        <h5>Tutorial on middleware</h5>
      </div>`
    );
  }
);

server.listen(3000, () => {
    console.log("server is app and running on port 3000");
  });