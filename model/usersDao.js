var mysql = require('mysql');
var connection = require('../model/commonDao.js').connection;

//【DB】IDとパスワードをもとにユーザを取得
function selectUser(id, password) {
    return new Promise((resolve, reject) => {
        //IDとパスワードが等しいレコードの取得
        const sql = 'SELECT * FROM users WHERE id = ? AND password = ?;';
        connection.query(sql, [id, password], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            resolve(results);
        });
    });
}

//IDとパスワードの認証
async function identifyId(id, password) {
    var results = await selectUser(id, password);
    let result;
    if (results.length > 0) {
        console.log('OK');
        result = true;
    } else {
        console.log('NG');
        result = false;
    }
    console.log('けっか：' + result);
    return result;
}

//【DB】ユーザを登録
function insertUser(id, password) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users VALUES(?,?);';
        connection.query(sql, [id, password], function (error, results, fields) {
            if (error) {
                console.log('エラー');
                console.log(error.code);
            }
            resolve(results);

        });
    })
}

async function resisterUser(id, password) {
    await insertUser(id, password);
    // let result;
    // if (results.affectedRows > 0) {
    //     console.log('OK');
    //     result = true;
    // } else {
    //     console.log('NG');
    //     result = false;
    // }
    // return result;
}

//export
module.exports = {
    identifyId: identifyId,
    resisterUser: resisterUser
};
