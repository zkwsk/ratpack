'use strict';
/* global freewall*/

$(function(){

  var temp = '<div class="brick" style="width:{width}px;"><img src="/images/band/{index}.jpg" width="100%"></div>';
  var w = 1, html = '', limitItem = 8;
  for (var i = 0; i < limitItem; ++i) {
    w = 1 + 3 * Math.random() << 0;
    html += temp.replace(/\{width\}/g, w*200).replace('{index}', i + 1);
  }

  $('#freewall').html(html);
  
  var wall = new freewall('#freewall');
  wall.reset({
    animate: true,
    selector: '.brick',
    gutterX: 7,
    gutterY: 7,
    cellW: '230',
    cellH: 'auto',
    onResize: function() {
      wall.fitZone();
      wall.fillHoles();
    }
  });

  var images = wall.container.find('.brick');
  images.find('img').load(function() {
    wall.fitZone();
    wall.fillHoles();
  });
});
