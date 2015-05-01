'use strict';

$(function(){
    var next;
    jQuery('.next').click(function() {
        if (next === undefined) {
            next = jQuery('[class^="page-"]').next();
        } else {
            if (prev === undefined) {
                next = next.next();
            } else {
                next = prev.next();
                    prev = undefined;
            }
        }
        jQuery('body').scrollTo(next, 800);
    });


    var prev;
    jQuery('.prev').click(function() {
        if (prev === undefined) {
            if (next === undefined) {
                prev = jQuery('[class^="page-"]').prev();
            } else {
                prev = next.prev();
            }

        } else {
            prev = prev.prev();
        }
        jQuery('body').scrollTo(prev, 800);
    });
})();