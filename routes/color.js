var express = require('express');
var booksDao = require('../model/booksDao.js');
var router = express.Router();

/* GET:色検索画面表示 */
router.get('/', async function (req, res, next) {
    //color.ejs表示
    option = {
        id: req.session.userId,
        flag: 0   //初期表示 
    }
    res.render('color', option);
});


/* POST:色をもとに検索 */
router.post('/', async function (req, res, next) {
    //カラーコードの取得
    const color = req.body.color;
    console.log("searchPOST:" + color);

    //カラーコードをもとに似た色の本の投稿を取得
    const posts = await booksDao.getBooksByColor(color);
    console.log('searchRouter:結果：' + posts);
    //カラーコード分解
    option = {
        id: req.session.userId,
        posts: posts,   //投稿
        color: color,    //検索した色
        flag: 1   //検索後表示 
    }
    res.render('color', option);
});

module.exports = router;