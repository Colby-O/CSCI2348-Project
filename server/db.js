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
        console.log(err);
      } else {
        res(result[0]);
      }
    });
  });
}

// Created: Mohammed Al-Bashiri April 12
// Modified: Colby O'Keefe (A00428974) April 12
async function getWordBank() {
  return await new Promise((res, rej) => {
    // Place code to get word bank here!
    let query = `SELECT * FROM WordBank`;
    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res(result);
      }
    });
  });
}

// Created: Mohammed Al-Bashiri April 12
// Modified: Colby O'Keefe (A00428974) April 12
function updateBlog(id, content) {
  // Place code to update a blogs content here!
  let query = `UPDATE Blogs SET blog_content = '${content}' WHERE blog_id = ${id}`;
  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}

// Created: Mohammed Al-Bashiri April 12
// Modified: Colby O'Keefe (A00428974) April 12
function changeBlogsPublishStatus(id, published) {
  // Place code to chnage a blog publish status here!
  let status = published ? "P" : "NP";
  let query = `UPDATE Blogs SET blog_status = '${status}' WHERE blog_id = ${id}`;
  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}

// Created: Mohammed Al-Bashiri April 12
// Modified: Colby O'Keefe (A00428974) April 12
async function getNumberOfWords() {
  return await new Promise((res, rej) => {
    let query = `SELECT COUNT(*) as no_words FROM WordBank`;
    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res(result[0]["no_words"]);
      }
    });
  });
}

// Created: Colby O'Keefe (A00428974) April 12
async function isWordInBank(word) {
  return await new Promise((res, rej) => {
    let query = `SELECT COUNT(*) as no_words FROM WordBank WHERE word='${word}'`;
    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res(result[0]["no_words"] > 0);
      }
    });
  });
}

// Created: Mohammed Al-Bashiri April 12
// Modified: Colby O'Keefe (A00428974) April 12
async function addWordToBank(word) {
  let numberOfWords = await getNumberOfWords();
  let isInWordBank = await isWordInBank(word);

  if (numberOfWords > 10) {
    // TODO: Add function let user know the word bank is full
    return;
  } else if (isInWordBank) {
    // TODO: Let user know the word is already in the word bank
    return;
  }

  let wordID = numberOfWords + 1;
  let query = `INSERT INTO WordBank VALUES (
    ${wordID}, 
    '${word}', 
    NOW()
    )`;
  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}

/*
  Created by Colby O'Keefe (A00428974) + SDR, April 14
*/
function decreaseID(id) {
  let query = `UPDATE WordBank SET word_id = word_id - 1 WHERE word_id > ${id}`;
  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}

/*
  Created: Mohammed Al-Bashiri April 12
  Modified: Colby O'Keefe (A00428974) April 12
  Modified: SDR, April 14.
*/
function deleteWordFromBank(id) {
  // Place code to delete a word from the bank here!
  let query = `DELETE FROM WordBank WHERE word_id = ${id}`;
  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  decreaseID(id);
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
