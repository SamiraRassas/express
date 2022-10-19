const express = require('express')
const server =express()

server.get('/index.html', (req, res) => {
    res.sendFile(__dirname+"/"+ 'index.html');
  })
  
  server.get('/processget', (req, res) => {
     response={
        first_name: req.query.first_name,
        last_name: req.query.last_name,
     };
     console.log(response)
     res.send('<p>Username:'+req.query['first_name']+'</p><p>Lastname:'+req.query['last_name']+'</p>');
    //  res.end(JSON.stringify(response));
    })
      
 
    server.listen(3000, ()=>{
        console.log("server is app and running on port 3000")
    })