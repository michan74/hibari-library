var mysql = require('mysql');

//connection.end()

//データベース接続情報
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

//データベース接続
function connectDatabase() {
    connection.connect();
};

//export
module.exports = {
    connection: connection,
    connectDatabase: connectDatabase
};

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';