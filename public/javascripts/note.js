$(function () {
    //投稿の本情報を取得
    showBookInfo();
})

//本IDをもとに本情報を取得、表示
function showBookInfo() {
    //表示されている投稿情報を全てループ
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
                        getInfo(data.volumeInfo.publisher);
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

//情報を取得
//undifinedの場合空白を返す
function getInfo(info) {
    if (info == undefined) {
        return "";
    } else {
        return info;
    }
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