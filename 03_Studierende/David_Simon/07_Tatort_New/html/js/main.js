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
    var availableBackgrounds = 2,
        randBackgroundInt = Math.round(1+Math.random()*(availableBackgrounds-1));
    $('.layout__header-container').addClass('background-' + randBackgroundInt);

});