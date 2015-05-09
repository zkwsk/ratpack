'use strict';
/* global freewall*/

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

  // jQuery.fn.swapWith = function(to) {
  //     return this.each(function() {
  //         var copy_to = $(to).clone(true);
  //         var copy_from = $(this).clone(true);
  //         $(to).replaceWith(copy_from);
  //         $(this).replaceWith(copy_to);
  //     });
  // };


  // function swap_images() {
  //   var $i = $('[class*=square]');

  //   var $this = $i.random();
  //   var $rand = $i.not($this).random();
  //   $this.swapWith($rand);
  //   $i = $('[class*=square]');


  //   setTimeout(swap_images, 750 );
  // }

  // swap_images();

  $(".fancybox").fancybox({
      helpers:  {
          title : {
              type : 'inside'
          }
      }
  });
});
