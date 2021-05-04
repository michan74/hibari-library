var express = require('express');
var router = express.Router();

var booksDao = require('../model/booksDao.js');

/* 自分の投稿初期表示 */
router.get('/', async function (req, res, next) {
    //ユーザIDの取得
    const userId = req.session.userId;

    //カラーコードをもとに似た色の本の投稿を取得
    const posts = await booksDao.getBooksByUserId(userId);
    console.log('noteRouter:結果：' + posts);
    //カラーコード分解
    option = {
        id: userId,
        posts: posts   //投稿 
    }
    res.render('note', option);
});

module.exports = router;
