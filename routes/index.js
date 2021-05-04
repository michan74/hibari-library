var express = require('express');
var router = express.Router();

//外部モジュールのimport
var usersDao = require('../model/usersDao.js');

//GET:ログイン画面表示
router.get('/', function (req, res, next) {
  //commonDao.connectDatabase();
  const option = {
    flag: 0
  }
  res.render('index', option);
});

//POST:ログイン処理
router.post('/', async function (req, res, next) {
  //IDとPWの取得
  const id = req.body.id;
  const password = req.body.password;
  //console.log('結果：' + await usersDao.identifyId(id, password));
  //IDとパスワードの認証
  if (await usersDao.identifyId(id, password)) {
    //ログイン成功
    console.log('ログイン完了');
    //セッションに入れる
    req.session.userId = id;
    const option = {
      id: req.session.userId,
      flag: 0   //初期表示
    }
    //メニュー画面を開く
    res.render('menu', option);
  } else {
    //ログイン失敗
    console.log('ログイン失敗');
    //再度初期表示
    const option = {
      flag: 1  //ログイン失敗
    }
    res.render('index', option);
  }
});

//GET:登録画面表示
router.get('/resister', function (req, res, next) {
  const option = {
    flag: 0  //初期画面
  }
  res.render('resister', option);
});

//POST:新規登録
router.post('/resister', async function (req, res, next) {
  //IDとPWの取得
  const id = req.body.id;
  const password = req.body.password;
  //ユーザの登録
  await usersDao.resisterUser(id, password);
  //登録成功
  console.log('登録完了');
  //resister.ejs表示
  const option = {
    flag: 1  //登録完了
  }
  res.render('resister', option);
});

//ログアウト
router.get('/logout', function (req, res, next) {
  //logout.ejs表示
  res.render('logout');
});

module.exports = router;
