/**
 *  This code has functions that post and get data
 *  from the server side.
 *
 *  Mohammed Al-Bashiri (A00391502) + Colby O'Keefe (A00428974)
 */
"use strict";

const express = require("express"); // start express application
const db = require("./src/db.js");
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
  console.log(`Listening on port ${port}`);
});
// ---------------------------------------------------------------------------------

server.post("/publishBlog", (req, res) => {
  req.body.published = req.body.published === "true";
  console.log(
    (req.body.published ? "Publishing" : "Unpublishing") +
      " Blog " +
      req.body.blogIndex
  );

  db.changeBlogsPublishStatus(req.body.blogIndex, req.body.published);
  return res.status(200);
});

server.post("/saveWord", async (req, res) => {
  console.log(`Saving ${req.body.word} to the word bank.`);
  let error = await db.addWordToBank(req.body.word);
  return res.status(200).send(error);
});

// Upon receiving a post at this url execute callback function
server.post("/saveBlog", (req, res) => {
  console.log(
    `Saving Blog ${req.body.blogIndex}'s Content: ${req.body.blogContent}`
  );

  db.updateBlog(req.body.blogIndex, req.body.blogContent);

  return res.status(200);
});

server.post("/deleteWord", (req, res) => {
  console.log(`Word ${req.body.index} was deleted from the word bank.`);
  db.deleteWordFromBank(req.body.index);
  return res.status(200);
});

// Upon receiving a post at this url execute callback function
server.get("/getBlog", async (req, res) => {
  console.log(`Getting Blog ${req.query.blogIndex}`);
  let blog = await db.getBlog(req.query.blogIndex);
  return res.status(200).send(blog);
});

// Gets word bank
server.get("/getWordBank", async (req, res) => {
  console.log("Fetching the word bank.");
  let wordBank = await db.getWordBank();
  return res.status(200).send(wordBank);
});
