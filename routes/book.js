var express = require('express');
var router = express.Router();

var booksDao = require('../model/booksDao.js');

//GET:本画面表示
router.get('/', async function (req, res, next) {
    //パラメータ取得
    let bookId = req.query.id;
    let word = req.query.word;
    console.log("選択した本ID：" + bookId);
    //本投稿を取得
    let posts = await booksDao.getBooks(bookId);
    console.log(posts);
    const option = {
        bookId: bookId,
        word: word,
        posts: posts,
        id: req.session.userId,
        flag: 1 //検索後表示
    }
    res.render('search', option);
});
//POST:本を投稿
router.post('/', async function (req, res, next) {
    console.log('本投稿' + req.body.color);
    let bookId = req.body.bookId;
    let word = req.body.word;
    //パラメータ取得
    let book = {
        bookId: bookId,
        userId: req.session.userId,
        color: req.body.color,
        image: req.body.image,
        comment: req.body.comment
    }
    //本投稿
    booksDao.postBook(book);
    //本投稿を取得
    let posts = await booksDao.getBooks(bookId);
    //res.redirect('/search?word=' + word + '&id=' + bookId);
    const option = {
        bookId: bookId,
        word: word,
        posts: posts,
        id: req.session.userId,
        flag: 1 //検索後表示
    }
    res.render('search', option);
});

module.exports = router;
