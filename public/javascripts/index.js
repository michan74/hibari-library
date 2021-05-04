$(function () {
    //入館を押下時
    //２ページ目へ移動
    //アンカーを用いた移動：https://dbit.jp/articles/javascript-page-a-name
    $('#open').on('click', function () {
        scrollAction('#login');
    });

    //ログインボタン押下時
    $('#key').on('click', function () {
        //画面遷移GET
        //https://qiita.com/shuntaro_tamura/items/99adbe51132e0fb3c9e9
        //window.location.href = '/search';

        //入力チェック
        //全てのrequired項目をループ
        $('input[required]').each(function () {
            if (!$(this).val() || !$(this).val().match(/\S/g)) {
                //alert("NG");
                $(this).addClass('required');
            } else {
                $(this).removeClass('required');
            }
        })
        if ($('.card .required').length === 0) {
            //フォーム送信
            $('#loginForm').submit();
        }

    });

    //＋ボタン押下時
    $('#resister').on('click', function () {
        window.location.href = '/resister';
    });

});

//ページ内指定箇所へのスクロール：http://kyasper.com/jquery-tips/
function scrollAction(adress) {
    // #で始まるアンカーをクリックした場合に処理
    //$('a[href^=#]').on('click', function () {
    // スクロールの速度
    var speed = 400; // ミリ秒
    // アンカーの値取得
    //var href = $(this).attr("href");
    var href = adress;
    // 移動先を取得
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を数値で取得
    var position = target.offset().top;
    // スムーススクロール
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    //return false;
    //});
}