$(function () {
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
})