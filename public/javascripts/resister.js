$(function () {
    //発行ボタンを王カイジ
    $('#resister').on('click', function () {
        //未入力チェック
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
            $('#resisterForm').submit();
        }
    })

    //登録完了後に戻る押下時
    $('#return').on('click', function () {
        window.location.href = '/';
    })
})