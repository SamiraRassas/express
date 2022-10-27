const express = require("express");
const server = express();
server.set("viewengine", "pug");
server.get("/", (req, res) => {
  res.render("index.pug", {
    title: "HEY",
    message: "hello there!",
  });
});
server.listen(3000, () => {
    console.log("server is app and running on port 3000");
  });
  