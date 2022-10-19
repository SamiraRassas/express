const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const { appendFile } = require('fs')
var urlencodedParser = bodyParser.urlencoded({extended: false})
const server =express()
server.use(express.static('public'));
server.use(cookieParser());

server.get('/index.html', (req, res) => {
    res.sendFile(__dirname+"/"+ 'index.html');
  })
  server.get('/cookie', (req, res) => {
    res.cookie("name","samira").send("Cookie is set");
  })
  
  server.post('/processpost',urlencodedParser, (req, res) => {
     response={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
     };
     console.log(response)
     res.send('<p>Username:'+req.body['first_name']+'</p><p>Lastname:'+req.body['last_name']+'</p>');
    //  res.cookie("name","samira").send("Cookie is set");
     
    //  res.end(JSON.stringify(response));
    })
      
 
    server.listen(3000, ()=>{
        console.log("server is app and running on port 3000")
    })