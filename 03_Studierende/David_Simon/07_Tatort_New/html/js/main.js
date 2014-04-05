/* ====================================================================
        Main
   ==================================================================== */

$(document).ready(function () {
    'use strict';

    // instantiate Fast-Click
    if (Modernizr.touch) {
        FastClick.attach(document.body);
    }

    // Random Header Background
    var shuffleArray = function (v) {
            /* jshint ignore:start */
            for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
            /* jshint ignore:end */
            return v;
        }
      , availableBackgrounds = shuffleArray(['schimanski', 'kurtulus', 'bienzle'])
      , currentBackground = 0;
    setInterval(function () {
        var newBackground = (currentBackground < availableBackgrounds.length) ? currentBackground+1 : 0;
        console.log(newBackground);
        $('.layout__header-container').removeClass('background-' + availableBackgrounds[currentBackground]).addClass('background-' + availableBackgrounds[newBackground]);
        currentBackground = newBackground;
    },5000);
});