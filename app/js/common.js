'use strict';

// ------------ Main Navigation Module ------------

var mainNav = (function() {
	var headerSection = $('.page-header'),
		navTrigger    = headerSection.find('.page-header__menu-trigger'),
		nav           = headerSection.find('.page-header__menu'),
		navLinks      = nav.find('.page-header__menu-link');

	function _setupListeners() {
		navTrigger.on('click', function(e) {
			e.preventDefault();
			if (navTrigger.hasClass('page-header__menu-trigger--active')) {
				_hideMenu();
				return;
			}
			_showMenu();
		});
		navLinks.on('click', function(e) {
			e.preventDefault();
			var anchorLink = $(this).attr('href');

			nav.css('display', 'none');
			navTrigger.removeClass('page-header__menu-trigger--active');
			scroll.to(anchorLink);

		});
	}

	function _hideMenu() {
		nav.slideUp(300, 'swing', function() {
			navTrigger.removeClass('page-header__menu-trigger--active');
		});
	}

	function _showMenu() {
		nav.slideDown(300, 'swing', function() {
			navTrigger.addClass('page-header__menu-trigger--active');
		});
	}

	function init() {
		_setupListeners();
	}

	init();

}());

// ------------ Section Jumps Module ------------

var scroll = (function() {

	function to(anchorLink) {
		if (anchorLink.length <= 1) { return }

		var targetString = anchorLink.substring(1),
			targetNode   = $('.' + targetString);
		$('html, body').animate({
        	scrollTop: targetNode.offset().top
    	}, 500);
	}

	return {
		to: to
	}

}());

// ------------ Slider ------------

$.fn.slider = function(options) {
	
	var _self = this;
	//DOM Nodes
	var sliderNode     = this,
		slides         = sliderNode.find('.slider__slides'),
		prevSlideLink  = sliderNode.find('.slider__prev'),
		nextSlideLink  = sliderNode.find('.slider__next'),
		pagination     = sliderNode.find('.slider__pagination');
	// Other variables
	var currentSlideIndex = options.currentSlide || 0,
		slideDuration     = options.duration || 0.3,
		slidesCount       = slides.children().length,
		slideSize         = sliderNode.outerWidth(),
		autoSlideDelay    = options.delay || false,
		timer;

	this.prevSlide = function() {
		if (currentSlideIndex === 0) {
			currentSlideIndex = slidesCount - 1;
			return;
		}
		currentSlideIndex--;	
	};

	this.nextSlide = function() {
		if (currentSlideIndex === slidesCount - 1) {
			currentSlideIndex = 0;
			return;
		}
		currentSlideIndex++;
	};

	this.createPagination = function() { // add list items and links to pagination list
		if (!pagination.length) { return; }  // only if pagination is needed

		var fragment = $(document.createDocumentFragment());

		for (var i = 0; i < slidesCount; i++) {
			var pagItem = $(document.createElement('li'));
			pagItem.addClass(options.pagItemClass);

			var pagLink = $(document.createElement('a'));
			pagLink.addClass(options.pagLinkClass);
			pagLink.attr('data-slide', i);

			pagItem.append(pagLink);
			fragment.append(pagItem);
		}
		pagination.append(fragment);
		pagination.children().eq(currentSlideIndex).find('a').addClass('active');
	};

	this.render = function() {
		slides.css('margin-left', (-currentSlideIndex * slideSize));

		if (pagination.length) {
			pagination.find('.active').removeClass('active');
			pagination.children().eq(currentSlideIndex).find('a').addClass('active');
		}
	};

	this.setupListeners = function() {
		if (prevSlideLink) {
			prevSlideLink.on('click', function (e) {
				e.preventDefault();
				_self.prevSlide();
				_self.render();
				clearInterval(timer);
			});
		}
		if (nextSlideLink) {
			nextSlideLink.on('click', function (e) {
				e.preventDefault();
				_self.nextSlide();
				_self.render();
				clearInterval(timer);
			});
		}
		if(pagination) {
			pagination.on('click', function(e) {
				e.preventDefault();
				var target = $(e.target);
				if (target.prop("tagName") !== 'A') { return; }

				clearInterval(timer);
				currentSlideIndex = +target.data('slide');
				_self.render();	
			});
		}
		$(window).on('resize', function() {
			slideSize = sliderNode.outerWidth(),
			_self.render();
		});		
	};

	this.autoSlide = function() {
		if (!autoSlideDelay) { return }

		timer = setInterval(function() {
			_self.nextSlide();
			_self.render();	
		}, autoSlideDelay);
	}

	this.init = function() {
		slides.css('transition', ('margin ' + slideDuration + 's' + ' linear'));
		this.createPagination();
		this.setupListeners();
		this.render();
		this.autoSlide();
	}

	this.init();
}
// ------------------- END Slider -------------------

$('.testimonials__slider').slider({
	duration: 0.2
});