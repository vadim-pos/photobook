"use strict";var mainNav=function(){function e(){a.on("click",function(e){return e.preventDefault(),a.hasClass("page-header__menu-trigger--active")?void n():void i()}),s.on("click",function(e){e.preventDefault();var n=$(this).attr("href");d.css("display","none"),a.removeClass("page-header__menu-trigger--active"),scroll.to(n)})}function n(){d.slideUp(300,"swing",function(){a.removeClass("page-header__menu-trigger--active")})}function i(){d.slideDown(300,"swing",function(){a.addClass("page-header__menu-trigger--active")})}function t(){e()}var r=$(".page-header"),a=r.find(".page-header__menu-trigger"),d=r.find(".page-header__menu"),s=d.find(".page-header__menu-link");t()}(),scroll=function(){function e(e){if(!(e.length<=1)){var n=e.substring(1),i=$("."+n);$("html, body").animate({scrollTop:i.offset().top},500)}}return{to:e}}();$.fn.slider=function(e){var n,i=this,t=this,r=t.find(".slider__slides"),a=t.find(".slider__prev"),d=t.find(".slider__next"),s=t.find(".slider__pagination"),l=e.currentSlide||0,o=e.duration||.3,c=r.children().length,u=t.outerWidth(),f=e.delay||!1;this.prevSlide=function(){return 0===l?void(l=c-1):void l--},this.nextSlide=function(){return l===c-1?void(l=0):void l++},this.createPagination=function(){if(s.length){for(var n=$(document.createDocumentFragment()),i=0;i<c;i++){var t=$(document.createElement("li"));t.addClass(e.pagItemClass);var r=$(document.createElement("a"));r.addClass(e.pagLinkClass),r.attr("data-slide",i),t.append(r),n.append(t)}s.append(n),s.children().eq(l).find("a").addClass("active")}},this.render=function(){r.css("margin-left",-l*u),s.length&&(s.find(".active").removeClass("active"),s.children().eq(l).find("a").addClass("active"))},this.setupListeners=function(){a&&a.on("click",function(e){e.preventDefault(),i.prevSlide(),i.render(),clearInterval(n)}),d&&d.on("click",function(e){e.preventDefault(),i.nextSlide(),i.render(),clearInterval(n)}),s&&s.on("click",function(e){e.preventDefault();var t=$(e.target);"A"===t.prop("tagName")&&(clearInterval(n),l=+t.data("slide"),i.render())}),$(window).on("resize",function(){u=t.outerWidth(),i.render()})},this.autoSlide=function(){f&&(n=setInterval(function(){i.nextSlide(),i.render()},f))},this.init=function(){r.css("transition","margin "+o+"s linear"),this.createPagination(),this.setupListeners(),this.render(),this.autoSlide()},this.init()},$(".testimonials__slider").slider({duration:.2});