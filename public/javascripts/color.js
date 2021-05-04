$(function () {
    //検索を押したとき
    $('#search').on('click', function () {
        //Form送信
        $('#colorSearchForm').submit();
    })

    //色を取得
    var color;
    if ($('.search').length) {
        //検索後の場合
        color = $('#color').val();
    } else {
        //検索前の場合
        color = "#ffffff";
    }

    //色を選択したとき
    $("#colorPicker").spectrum({
        color: color,     //初期値
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

    //検索後、本情報を取得
    if ($('.post').length) {
        //本IDをもとに本情報を取得、表示
        $('#scroll').find('.post').each(function () {
            //投稿の要素を取得
            const post = $(this);
            //BookId取得
            const bookId = post.find('.bookId').text().trim();
            //alert(boookId);

            //GoogleBooksでのデータ取得ようのURLを作成
            const url = "https://www.googleapis.com/books/v1/volumes/" + bookId;
            //alert(url);
            //キー："&key=AIzaSyDQXJouD9SmG50GLrOn_4SiatO3WIkL_os"

            //$.getJSON():指定のURLからJSONデータを受け取る関数
            $.getJSON(url, function (data) {
                //検索結果がある場合
                //alert(data);
                if (data.id === bookId) {
                    //alert("検索結果あり");
                    if (data.id === bookId) {
                        const bookInfo = '<span class="title">' + data.volumeInfo.title + '</span><br>' +
                            getAuthor(data.volumeInfo.authors) + '<br>' +
                            getInfo(data.volumeInfo.publisher) + '<br>' +
                            '<a href="' + data.volumeInfo.previewLink + '" target="_blank"><img src="images/searchIcon.png" class="searchIcon"></a>';
                        //alert(bookInfo);
                        post.find('.bookInfo').prepend(bookInfo);
                        //alert($('#bookTitle').innerHTML);
                    }
                } else {
                    //検索結果なしの場合
                    const message = '書籍情報なし。';
                    post.find('.bookInfo').prepend(message);
                }
            })
        })
    }
})

//情報を取得
//undifinedの場合空白を返す
function getInfo(info) {
    if (info == undefined) {
        return "";
    } else {
        return info;
    }
}

//日付のフォーマット
function formatDate(date) {
    console.log("フォーマット：" + date);
    let formatedDate = "";
    if (date.length > 0) {
        let momentDate = moment(date, 'YYYY-MM-DD');
        formatedDate = momentDate.format("YYYY年MM月DD日");
    }
    return formatedDate;
}

//著作者の取得
function getAuthor(authors) {
    let author = "";
    if (authors != undefined) {
        //著作者情報ありの場合
        if (authors.length > 0) {
            for (let i = 0; i < authors.length; i++) {
                author += authors[i];
                if (i != authors.length - 1) {
                    //続きがある場合は、「,」で区切る
                    author += ',';
                }
            }
        }
    }
    return author;
}
