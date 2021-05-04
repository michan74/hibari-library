$(function () {
    $('#menuIcon').on('click', function () {
        $('#menu').fadeToggle('slow', function () {
            menuAction();
        });
        $('#menuIcon').toggle();
    });
})

//メニュー表示時の動き
function menuAction() {
    //閉じるボタン押下時
    $('#closeMenu').on('click', function () {
        $('#menu').fadeOut('slow');
        $('#menuIcon').show();
    });

    //書架を押下時
    $('#searchBook').on('click', function () {
        //search getへ
        location.href = '/search';
    })

    //本を探すを押下時
    $('#searchColor').on('click', function () {
        //color getへ
        location.href = '/color';
    })


    //記録を押下時
    $('#searchPost').on('click', function () {
        //note getへ
        location.href = '/note';
    })

    //退館を押下時
    $('#logout').on('click', function () {
        //note getへ
        location.href = '/logout';
    })
}