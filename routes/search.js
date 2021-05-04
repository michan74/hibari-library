var express = require('express');
var router = express.Router();

var booksDao = require('../model/booksDao.js');

/* GET:本の検索画面を表示 */
router.get('/', async function (req, res, next) {
    //search.ejsを表示
    const option = {
        flag: 0   //初期表示
    }
    //メニュー画面を開く
    res.render('search', option);
});

module.exports = router;