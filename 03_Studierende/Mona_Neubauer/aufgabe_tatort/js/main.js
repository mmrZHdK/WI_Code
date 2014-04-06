$(document).ready(function () {
	$('.box-container').first().isotope({
	  itemSelector: '.box'

	});


	$('.flexslider').flexslider({
		animation: "slide",
		controlsContainer: ".flexslider-container"
	});
});