$(function() {
    'use strict';
    var subTitleDom = $('.index_subtitle');
    var subTitle = subTitleDom.text().split('|');

    var animateCount = 0;

    function showTitles() {
        subTitleDom.html(subTitle[animateCount]);
        var domAni = subTitleDom.animate({
            'opacity': 1
        }, 1000);
        if (animateCount < subTitle.length - 1) {
            domAni.delay(1000);
            domAni.animate({
                'opacity': 0
            }, 1000, function() {
                animateCount++;
                showTitles();
            });
        }
    }
    showTitles();
});