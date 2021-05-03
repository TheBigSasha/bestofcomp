$("#slideshow > div:gt(0)").hide();
var filterVal = 'blur(20px) saturate(0%)';

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(750)
    .next()
    .fadeIn(750)
    .end()
    .appendTo('#slideshow');
},  3000);
