

(function() {
  var cssTransition, imageOffset, imageWidth, images, queue, timeout, touch;

  cssTransition = function() {
    var body, i, len, style, vendor, vendors;
    body = document.body || document.documentElement;
    style = body.style;
    vendors = ['Moz', 'Webkit', 'O'];
    if (typeof style['transition'] === 'string') {
      return true;
    }
    for (i = 0, len = vendors.length; i < len; i++) {if (window.CP.shouldStopExecution(1)){break;}
      vendor = vendors[i];
      if (typeof style[vendor + 'Transition'] === 'string') {
        return true;
      }
    }
    window.CP.exitedLoop(1);

    return false;
  };



  queue = false;

  touch = document.documentElement['ontouchstart'] !== void 0;

  images = document.querySelector('.images');

  imageWidth = images.firstElementChild.offsetWidth;

  imageOffset = images.firstElementChild.offsetLeft;

  timeout = cssTransition() ? [300, 400] : [466, 334];

  let shuffleImges = function (event) {
    console.log("Shuffling images")
    var direction, lastClassList;
    if (queue) {
      return;
    }
    queue = true;
    if (event != undefined && ((touch ? event.changedTouches[0].pageX : event.pageX) - imageOffset) > imageWidth / 2) {
      direction = 'slide-right';
    } else {
      direction = 'slide-left';
    }
    lastClassList = images.lastElementChild.classList;
    lastClassList.add(direction);
    return setTimeout(function () {
      lastClassList.remove(direction);
      lastClassList.add('back');
      return setTimeout(function () {
        images.insertBefore(images.lastElementChild, images.firstElementChild);
        lastClassList.remove('back');
        return queue = false;
      }, timeout[0]);
    }, timeout[1]);
  }

  console.log(images)

  images.addEventListener((touch ? 'touchend' : 'click'), shuffleImges, false);
  setInterval(shuffleImges, 5000);



}).call(this);


