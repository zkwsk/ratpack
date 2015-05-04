'use strict';
/* global freewall*/

var colour = [
  "rgb(142, 68, 173)",
  "rgb(243, 156, 18)",
  "rgb(211, 84, 0)",
  "rgb(0, 106, 63)",
  "rgb(41, 128, 185)",
  "rgb(192, 57, 43)",
  "rgb(135, 0, 0)",
  "rgb(39, 174, 96)"
];

$(".free-wall .item").each(function() {
  var backgroundColor = colour[colour.length * Math.random() << 0];
  $(this).css({
    backgroundColor: backgroundColor
  });
});

$(function() {
  var wall = new freewall("#freewall");
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
  $(window).trigger("resize");
});