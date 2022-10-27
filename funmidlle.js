const express = require("express");
const server = express();
const mylogger = function (req, res, next) {
  console.log("first function hello");
  next()
};
const mylogger2 = function (req, res, next) {
  console.log("second function hello");
  next()
};
server.use(mylogger);
server.use(mylogger2);
server.get('/',(req,res)=>{
    res.send('hello world');
})
server.get('/about',(req,res)=>{
    res.send('hello world');
})

server.listen(3000, () => {
  console.log("server is app and running on port 3000");
});
