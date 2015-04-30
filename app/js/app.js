'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function () {
                $(document).foundation('joyride', 'start');
            });
			_userAgentInit();
		};
	return {
		init: _init
	};


})(document, jQuery);

(function() {
	app.init();
})();


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
