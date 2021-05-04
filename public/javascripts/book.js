$(function () {
    //画面サイズ取得
    const width = window.innerWidth;
    const height = window.innerHeight;

    //本情報を取得し、表示
    window.onload = function () {
        getBookInfo();
    }
    //本投稿ボタンを押下したとき
    $('#postButton').on('click', function () {
        //コメントを漢字のみ
        //const regExp =
        ///^([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)+$/mu;
        //let inputComment = $('#commentText').val();
        //console.log(inputComment);
        //if (inputComment.match(\u30e0 - \u9fcf)) {
        //alert('OK');
        $('#postForm').submit();
        //} else {
        //  alert('NG');
        //$('#commentText').val("");
        //}
    })

    //色を選択したとき
    $("#colorPicker").spectrum({
        color: "#ffffff",     //初期値
        showAlpha: true, // 不透明度の選択バーを表示する
        preferredFormat: "hex",  //カラーコードで取得
        chooseText: "OK", // 選択ボタンのテキスト
        cancelText: "キャンセル", // キャンセルボタンのテキスト
        // 値の変更(確定)時イベント
        change: function (color) {   //色選択後の処理
            //RGBAへ変換
            const pickColor = color.toRgbString();   //https://jpcloud.net/q/tefsyctd
            //選択した色を背景色にする。
            $('#bookPost').css('background', '');  //背景初期化
            $('#bookPost').css('background-color', color.toRgbString());
            //inputの値に入れる
            $('#color').val(pickColor);
        }
    });
})

function getBookInfo() {
    //BookId取得
    const bookId = $('input[name="bookId"]').val();
    //alert(boookId);

    //GoogleBooksでのデータ取得ようのURLを作成
    const url = "https://www.googleapis.com/books/v1/volumes/" + bookId;
    alert(url);
    //キー："&key=AIzaSyDQXJouD9SmG50GLrOn_4SiatO3WIkL_os"

    //alert(url);
    //url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:9784043636037:SameSite=None:Secure';
    //https://qiita.com/TakeshiNickOsanai/items/2d9c30cedcba21f36669
    //$.getJSON():指定のURLからJSONデータを受け取る関数
    $.getJSON(url, function (data) {
        //検索結果がある場合
        alert(data);
        if (data.id === bookId) {
            alert("検索結果あり");
            if (data.id === bookId) {
                const bookInfo = '<span class="title">' + data.volumeInfo.title + '</span><br>' +
                    getAuthor(data.volumeInfo.authors) + '<br>' +
                    getInfo(data.volumeInfo.publisher);
                $('#information').append(bookInfo);
                //alert($('#bookTitle').innerHTML);

                $('#bookTitle').append(data.volumeInfo.title + '<br>' + getAuthor(data.volumeInfo.authors));
            }
        } else {
            //検索結果なしの場合
            const message = '<tr><td>該当書籍なし。<td></tr>';
            $('#information').append(message);
        }
    })
}
