'use strict';
/* global freewall*/


var colour = [
  "bg-accent",
  "bg-primary",
  "bg-primary-dark",
  "bg-black"
];

$(".free-wall .item").each(function() {
  var colorSet = colour[colour.length * Math.random() << 0];
  $(this).addClass(colorSet);
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

