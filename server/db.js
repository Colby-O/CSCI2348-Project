let mySQL = require("mysql2");
let htpassed = require("./mysqldb.inc");

let pool = mySQL.createPool ({
    connectionLimit: 10,
    host: htpassed.host,
    port: htpassed.port,
    user: htpassed.user,
    password: htpassed.password,
    database: htpassed.database,
    charset: htpassed.charset

});

async function getBlog(id) {
    return await new Promise((res, rej) => {
        // Place code to get blog here!
    });
}

async function getWordBank() {
    return await new Promise((res, rej) => {
        // Place code to get word bank here!
    });    
}

function updateBlog(id, content) {
    // Place code to update a blogs content here!
}

function changeBlogsPublishStatus(id, status) {
    // Place code to chnage a blog publish status here!
}


function addWordToBank(id) {
    // Place code to add a word to the bank here!
}

function deleteWordFromBank(id) {
    // Place code to delete a word from the bank here!
}

// Exports 
module.exports = {
	"getBlog": getBlog,

	"updateBlog": updateBlog,

	"changeBlogsPublishStatus": changeBlogsPublishStatus,

    "getWordBank": getWordBank,

    "addWordToBank": addWordToBank,

    "deleteWordFromBank": deleteWordFromBank
};
