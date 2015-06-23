/* jshint devel:true */


$(window).ready(function() {

    'use strict';

    var totalWidth = 0;

    $('[name="phone"]').inputmask("mask", {
        mask: "+9[9](999)99-9999[9]",
        skipOptionalPartCharacter: " ",
        showMaskOnHover: false,
        autoUnmask: true
    });


    /* =========================== SWITCHER-CAROUSEL =========================== */  

    $('div.slider').find(".swither__item").each(function() {
        totalWidth = totalWidth + $(this).outerWidth(true);
    });

    var maxScrollPosition = totalWidth - $('div.slider').find(".slider__swither").outerWidth(),
    switcher = $('div.slider').find(".slider__wrapper");

        // activeSwitcher = $('div.slider').find('.active');

        //console.log(maxScrollPosition);

        function toGalleryItem($targetItem) {
            if($targetItem.length) {

                var newPosition = $targetItem.position().left;

                if(newPosition <= maxScrollPosition) {

                    $targetItem.addClass("swither__item--edge");
                    $targetItem.siblings().removeClass("swither__item--edge");

                    switcher.animate({
                        left : - newPosition
                    });
                } else {
                    switcher.animate({
                        left : - maxScrollPosition
                    });
                }
            }
        }

        switcher.width(totalWidth);

        $('div.slider').find(".swither__item:first").addClass("swither__item--edge");

        $('div.slider').find(".nav--prev").on('click', function(e) {
            e.preventDefault();
            var $targetItem = $('div.slider').find(".swither__item--edge").prev();
            toGalleryItem($targetItem);
        });

        $('div.slider').find(".nav--next").on('click', function(e) {
            e.preventDefault();
            var $targetItem = $('div.slider').find(".swither__item--edge").next();
            toGalleryItem($targetItem);
        });

// $('.swither__item').on('click',
// 					function() {
// 						$('.swither__item').removeClass('active');
// 						$('.content__item').hide();

// 						var $this = $(this);

// 						$(this).addClass('active');

// 						console.log( $this.data('descr'));

// 						$('.' + $this.data('descr')).fadeToggle(300)
// 					});
// $('.swither__item:first-child').trigger('click');

    $('.tab').hide();
    $('.tab__desc').show();


    $('.tab__link').on('click', function( e ) {
        e.preventDefault();

        var $this = $(this);

        $('.tab__link').removeClass('active');
        $('.tab').hide();

        $this.addClass('active');
        $('.' + $this.data('tab')).fadeToggle(300);
    });


    $('.phone__hide').on('click', function(e) {
        e.preventDefault();

        $(this).replaceWith('<strong class="color--green">093-45-258-55</strong>');

});
});

