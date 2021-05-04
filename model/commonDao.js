var mysql = require('mysql');

//connection.end()

//データベース接続情報
var connection = mysql.createConnection({
    host: process.env.DATEBASE_HOST,
    user: process.env.DATEBASE_USER,
    password: process.env.DATEBASE_PASSWORD,
    database: process.env.DATEBASE_DATEBASE
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