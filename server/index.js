/**
 * this code has functions that post and get data
 * form the server from the server side
 *
 * Mohammed Al-Bashiri (A00391502)
 */

const express = require("express"); // start express application
const server = express(); // define top level function
const port = 3033;

server.use(express.json()); // implement JSON recognition
server.use(express.urlencoded({ extended: true })); // implement incoming name:value pairs to be any type

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow any origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow any method
  res.header("Access-Control-Allow-Headers", "Content-Type"); // accept only headers with this type
  next(); // middleware callback function required for processing
};
server.use(allowCrossDomain); // implement allowable domain characteristics

server.listen(port, function () {
  console.log("Listening on port 3033");
});
// ---------------------------------------------------------------------------------

// blog array
const blog = [
  { title: "", content: "" },
  { title: "", content: "" },
  { title: "", content: "" },
];

// Upon receiving a post at this url execute callback function
server.post("/saveBlog", function (req, res) {
  console.log("name:" + req.body.blogContent);

  blog[req.body.blogIndex - 1].title = req.body.blogTitle;
  blog[req.body.blogIndex - 1].content = req.body.blogContent;

  return res.status(200);
});

// Upon receiving a post at this url execute callback function
server.get("/getBlog", function (req, res) {
  console.log(req.query.blogIndex);
  return res.status(200).send(blog[req.query.blogIndex - 1]);
});
