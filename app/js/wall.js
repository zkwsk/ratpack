'use strict';
/* global freewall*/
/* global Modernizr*/
/* global Foundation */

$(function() {
  var wall = new freewall('#freewall');

  wall.reset({
    selector: '.level1',
    cellW: 320,
    cellH: 160,
    fixSize: 0,
    gutterX: 20,
    gutterY: 10,
    onResize: function() {
      wall.fitZone();
    }
  });
  wall.fitZone();

  $.fn.random = function() {
      var randomIndex = Math.floor(Math.random() * this.length);  
      return $(this[randomIndex]);
  };

  var $freewall = $('#freewall');
  var $i = $freewall.find('i');

  $.each($i, function(index, item){
    var $item = $(item);
    var $filename = $item.attr('class').replace('tile-','');
    var $title = $item.find('.text-bottom > *').text();
    if ( !(Modernizr.touch) ){
      $item.wrap('<a rel="band" href="/images/tiles/large/' + $filename + '.jpg" class="fancybox" title="' + $title  + '"></a>');
    }
  });

  if ( !(Modernizr.touch) ){
    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
    
  }


});
