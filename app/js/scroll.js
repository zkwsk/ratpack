'use strict';

$(function(){
    var next;
    $('.next').click(function() {
        if (next === undefined) {
            next = $('[class^="page-"]').next();
        } else {
            if (prev === undefined) {
                next = next.next();
            } else {
                next = prev.next();
                    prev = undefined;
            }
        }
        $('body').scrollTo(next, 800);
    });


    var prev;
    $('.prev').click(function() {
        if (prev === undefined) {
            if (next === undefined) {
                prev = $('[class^="page-"]').prev();
            } else {
                prev = next.prev();
            }

        } else {
            prev = prev.prev();
        }
        $('body').scrollTo(prev, 800);
    });
});