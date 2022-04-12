let mySQL = require("mysql2");
let htpassed = require("./mysqldb.js");

let pool = mySQL.createPool({
  connectionLimit: 10,
  host: htpassed.host,
  port: htpassed.port,
  user: htpassed.user,
  password: htpassed.password,
  database: htpassed.database,
  charset: htpassed.charset,
});

async function getBlog(id) {
  return await new Promise((res, rej) => {
    let query = `SELECT * FROM Blogs WHERE blog_id = ${id}`;
    pool.query(query, (err, result) => {
      if (err) {
        console.log(
          "ERROR: " + err
        );
      } else {
        res(result);
      }
    });
  });
}

async function getWordBank() {
  return await new Promise((res, rej) => {
    // Place code to get word bank here!
    let query = `SELECT * FROM WordBank WHERE word_id = ${id}`;
    pool.query(query, (err, result) => {
      if (err) {
        console.log("ERROR: " + err);
      } else {
        res(result);
      }
    });
  });
}

function updateBlog(id, content) {
  // Place code to update a blogs content here!
}

function changeBlogsPublishStatus(id, status) {
  // Place code to chnage a blog publish status here!
}

function addWordToBank(word) {
  // Place code to add a word to the bank here!
  // Note Terry said we need a maximum number of words let say 10
  // Send user an error if there are already 10 entries in the bank
}

function deleteWordFromBank(id) {
  // Place code to delete a word from the bank here!
}

// Exports
module.exports = {
  getBlog: getBlog,

  updateBlog: updateBlog,

  changeBlogsPublishStatus: changeBlogsPublishStatus,

  getWordBank: getWordBank,

  addWordToBank: addWordToBank,

  deleteWordFromBank: deleteWordFromBank,
};
