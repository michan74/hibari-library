var mysql = require('mysql');
var connection = require('../model/commonDao.js').connection;
var request = require('request');

//【DB】本を登録
function insertBook(book) {
    return new Promise((resolve, reject) => {
        console.log('------');
        console.log(book.userId + ":" + book.bookId + ":" + book.image + ":" + book.color);
        //カラーコードを分解
        const start = book.color.indexOf('(');
        const end = book.color.indexOf(')');
        const color = book.color.slice((start + 1), end).split(',');
        console.log('整形後：' + color);

        const sql = 'INSERT INTO books(user_id,book_id,image,color,red,green,blue,alpha,comment) VALUES(?,?,?,?,?,?,?,?,?);';
        connection.query(sql, [book.userId, book.bookId, book.image, book.color, color[0], color[1], color[2], color[3], book.comment], function (error, results, fields) {
            if (error) {
                console.log('エラー');
                console.log(error.code + error.message);
            }
            resolve(results);
        });
    })
}
//本を投稿
async function postBook(book) {
    await insertBook(book);
}
//【DB】本の投稿を取得
function selectBooks(bookId) {
    return new Promise((resolve, reject) => {
        console.log('a-------');
        console.log(bookId);
        const sql = 'SELECT * FROM books WHERE book_id=? ORDER BY post_date DESC;';
        connection.query(sql, bookId, function (error, results, fields) {
            if (error) {
                console.log('エラー');
                console.log(error.code);
            }
            console.log(results);
            resolve(results);
        });
    })
}
//本を取得
async function getBooks(bookId) {
    let posts = await selectBooks(bookId);
    return posts;
}

//【DB】色をもとに本を検索
function selectBooksByColor(red, green, blue) {
    return new Promise((resolve, reject) => {
        console.log('rgb:' + red + ',' + green + ',' + blue);
        //カラーコードの幅を取得
        const redMin = parseInt(red, 10) - 20;
        const redMax = parseInt(red, 10) + 20;
        const greenMin = parseInt(green, 10) - 20;
        const greenMax = parseInt(green, 10) + 20;
        const blueMin = parseInt(blue, 10) - 20;
        const blueMax = parseInt(blue, 10) + 20;
        const sql = 'SELECT * FROM books WHERE (red BETWEEN ? AND ?) AND (green BETWEEN ? AND ?) AND (blue BETWEEN ? AND ?);';
        connection.query(sql, [redMin, redMax, greenMin, greenMax, blueMin, blueMax], function (error, results, fields) {
            if (error) {
                console.log('エラー');
                console.log(error.code);
            }
            console.log(results);
            resolve(results);
        });
    })
}

//似た色の本情報を取得
async function getBooksByColor(color) {
    //カラーコードを分解
    const start = color.indexOf('(');
    const end = color.indexOf(')');
    color = color.slice((start + 1), end).split(',');
    return await selectBooksByColor(color[0], color[1], color[2]);
}

//【DB】利用者IDをもとに本情報を取得
function selectBooksByUserId(userId) {
    return new Promise((resolve, reject) => {
        console.log("selectBooksByUser:" + userId);
        const sql = 'SELECT * FROM books WHERE user_id=? ORDER BY post_date DESC;';
        connection.query(sql, userId, function (error, results, fields) {
            if (error) {
                console.log('エラー');
                console.log(error.code);
            }
            console.log(results);
            resolve(results);
        });
    })
}
//利用者IDと等しい本情報を取得
async function getBooksByUserId(userId) {
    return await selectBooksByUserId(userId);
}

//export
module.exports = {
    postBook: postBook,
    getBooks: getBooks,
    getBooksByColor: getBooksByColor,
    getBooksByUserId: getBooksByUserId
};