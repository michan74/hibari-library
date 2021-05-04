var express = require('express');
var router = express.Router();

/* GET：メニュー表示 */
router.get('/', async function (req, res, next) {
    //menu.ejsへ
    option = {
        id: req.session.userId
    }
    res.render('menu', option);
});

module.exports = router;