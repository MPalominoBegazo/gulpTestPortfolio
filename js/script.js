(function () {
	"use strict";

	var items = document.querySelectorAll(".timeline li");
	
		function isElementInViewport(el) {
			var rect = el.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}
	
		function callbackFunc() {
			for (var i = 0; i < items.length; i++) {
				if (isElementInViewport(items[i])) {
					items[i].classList.add("in-view");
				}
			}
		}
		// listen for events
		window.addEventListener("load", callbackFunc);
		window.addEventListener("resize", callbackFunc);
		window.addEventListener("scroll", callbackFunc);

	$('.navbar-brand, .top-scroll a').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 2000);
				return false;
			}
		}
	});
	var navbarHeight = $('.navbar').height();
	$('a.btnAbout').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - navbarHeight
				}, 2000);
				return false;
			}
		}
	});

	setTimeout(function () {

		$('.progress-bar').each(function () {
			var me = $(this);
			var pe = $(this).parent().parent().children('.precent-value');
			var perc = me.attr("aria-valuenow");

			var current_perc = 0;

			var progress = setInterval(function () {
				if (current_perc >= perc) {
					clearInterval(progress);
				} else {
					current_perc += 1;
					me.css('width', (current_perc) + '%');
				}

				pe.text((current_perc) + '%');

			}, 20);

		});

	}, 300);
	$('.navbar-nav').onePageNav({
		scrollOffset: navbarHeight,
		scrollSpeed: 2000,
		scrollThreshold: 0.25
	});
	if ($().prettyPhoto) {

		imgHover();
	}

	if ($().quicksand) {

		var $data = $("ul.container_folio").clone();

		var $filterClass = $('#filterOptions li.cur a').attr('class');

	
		$('#filterOptions li a').click(function (e) {

			$('#filterOptions li').removeClass('cur');
			$('#filterOptions li a').removeClass('cur');
		
			var filterClass = $(this).attr('class').split(' ').slice(0)[0];
			$(this).parent().addClass('cur');

			if (filterClass == 'all') {
				var $filteredData = $data.find('li');

			} else {
				var $filteredData = $data.find('li[data-type~=' + filterClass + ']');
			}

			$("ul.container_folio").quicksand($filteredData, {
				duration: 800,
				adjustHeight: false,
				easing: 'swing'
			}, function () {
				
				imgHover();
			});

			$(this).addClass("cur");

			return false;
		});
	}

	$(".navbar").sticky({ topSpacing: 0 });
	$("[data-gal='tooltip']").tooltip();
	imgHover();

	navScroll();
	winHeight();

})();
$(window).resize(function () {
	navScroll();
	winHeight();
});
function imgHover() {
	$('.thumb-img').hover(function () {

		$(this).children('.folio-caption').animate({
			bottom: '0px'
		});

	}, function () {
		$(this).children('.folio-caption').animate({
			bottom: '-55px'
		});

	});
}

function navScroll() {
	$(window).scroll(function () {

		var top = $(window).scrollTop();
		var aboutScroll = $('#aboutMore').offset().top - 184
		if (top > aboutScroll) {

			$('.btnAbout').css({
				'position': 'absolute'
			});
			$('.navbar-inverse').addClass('bg-nav');

		} else {

			$('.btnAbout').css({
				'position': 'fixed'
			});
			$('.navbar-inverse').removeClass('bg-nav');

		}
		if (top > 20) {

			$('.btnAbout').css({
				'position': 'absolute'
			});
		} else {
			$('.btnAbout').css({
				'position': 'fixed'
			});
		}
	});
}
function winHeight() {
	var wHeight = $(window).height();
	$('.header').height(wHeight);
}



