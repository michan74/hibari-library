
//検索ワード保存用
let word;

$(function () {
    //本情報を表示
    getBookInfo();

    //スクロールされたとき
    $(window).on('scroll', function () {
        var height = $('#main').height();  // 画面の高さ取得
        //console.log(height);
        if ($(window).scrollTop() <= height) {
            $('#arrowIcon').fadeOut(); // 矢印を非表示
        } else {
            $('#arrowIcon').fadeIn(); // 矢印を表示
        }
    })

    //検索押下時
    $('#search').on('click', function () {
        //テキストボックスの中身を取得
        word = $('#searchWord').val();

        //中身の有無の確認
        if (word.length > 0) {
            //表の中身を消し去る
            $('#resultTable').empty();

            //GoogleBooksでのデータ取得ようのURLを作成
            const url = "https://www.googleapis.com/books/v1/volumes?q=" + word +
                "&key=AIzaSyDQXJouD9SmG50GLrOn_4SiatO3WIkL_os";

            //alert(url);
            //url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:9784043636037:SameSite=None:Secure';
            //https://qiita.com/TakeshiNickOsanai/items/2d9c30cedcba21f36669
            //$.getJSON():指定のURLからJSONデータを受け取る関数
            $.getJSON(url, function (data) {
                //検索結果がある場合
                if (data.totalItems) {
                    //alert("検索結果あり");
                    for (let i = 0; i < data.items.length; i++) {
                        const bookInfo = '<tr id=' + data.items[i].id + ' class="button"><td>' + data.items[i].volumeInfo.title + '</td>' +
                            '<td>' + getAuthor(data.items[i].volumeInfo.authors) + '</td>' +
                            '<td>' + getInfo(data.items[i].volumeInfo.publisher) + '</td></tr>';
                        $('#resultTable').append(bookInfo);
                    }
                    dblClickAction();

                } else {
                    //検索結果なしの場合
                    const message = '<tr><td>該当書籍なし。<td></tr>';
                    $('#resultTable').append(message);
                }

            })
        }
    })

    //本投稿ボタンを押下したとき
    $('#postButton').on('click', function () {
        //コメントを漢字のみ
        //const regExp =
        ///^([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)+$/mu;
        //let inputComment = $('#commentText').val();
        //console.log(inputComment);
        //if (inputComment.match(\u30e0 - \u9fcf)) {
        //alert('OK');
        //１度リセット
        $('#errorMessage').empty();
        //未入力チェック
        $('input[required]').each(function () {
            if (!$(this).val() && !$(this).val().match(/\S/g)) {
                //alert("NG");
                $(this).addClass('required');
            } else {
                $(this).removeClass('required');
            }
        })
        if ($('.required').length) {
            $('#errorMessage').append('未入力項目があります。');
        } else {
            //コメントの漢字チェック
            //if ($('#commentText').val().match(/[\u4E00-\u9FFF]/)) {
            //alert("OK");
            //$('#postForm').submit();
            //} else {
            //$('#errorMessage').append('漢字のみ入力可能です。');
            //}
            $('#postForm').submit();
        }

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

    //上矢印を押下したとき
    $('#arrowIcon').on('click', function () {
        //ページトップへ移動
        scrollAction('#main');
    })
})


//検索結果表示後の動き
function dblClickAction() {
    //行をダブルクリック時
    $('#resultTable tr').on('dblclick', function () {
        //alert("遷移" + $(this).attr('id'));
        window.location.href = '/book?word=' + $('#searchWord').val() + '&id=' + $(this).attr('id');
    })
}

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

//bookIDをもとに本情報を表示
function getBookInfo() {
    //本情報が表示されているとき
    if ($('#bookInfo').length) {
        //BookId取得
        const bookId = $('input[name="bookId"]').val();
        //alert(boookId);

        //GoogleBooksでのデータ取得ようのURLを作成
        const url = "https://www.googleapis.com/books/v1/volumes/" + bookId;
        //alert(url);
        //キー："&key=AIzaSyDQXJouD9SmG50GLrOn_4SiatO3WIkL_os"

        //alert(url);
        //url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:9784043636037:SameSite=None:Secure';
        //https://qiita.com/TakeshiNickOsanai/items/2d9c30cedcba21f36669
        //$.getJSON():指定のURLからJSONデータを受け取る関数
        $.getJSON(url, function (data) {
            //検索結果がある場合
            //alert(data);
            if (data.id === bookId) {
                //alert("検索結果あり");
                if (data.id === bookId) {
                    const bookInfo = '<span class="title">' + data.volumeInfo.title + '</span>' +
                        '<a href="' + data.volumeInfo.previewLink + '" target="_blank"><img src="images/searchIcon.png" class="searchIcon"></a>' + '<br>' +
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
}

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