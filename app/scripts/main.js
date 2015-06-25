/* jshint devel:true */

if (typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ) {

    var Slider = {
        init: function( options, elem ) {

            var maxScrollPosition, section, switcher, totalWidth, contentWidth, totalHeigt,
                self = this;
                self.elem = elem;
                // self.$elem = $ ( elem );

            self.options = $.extend( {}, $.fn.sliderGoods.options, options);

            self.calcConst();

            $(this.elem).find(".nav--prev").on('click', function(e) {
                e.preventDefault();
                var $targetItem = $(self.elem).find(".swither__item--edge").prev();

                self.toGalleryItem($targetItem);
            });

            $(this.elem).find(".nav--next").on('click', function(e) {
                e.preventDefault();
                var $targetItem = $(self.elem).find(".swither__item--edge").next();

                self.toGalleryItem($targetItem);
            });

        },

        calcConst: function() {
            totalWidth = 0;
            totalHeigt =0;

            section = $(this.elem).outerWidth() - 40;
            contentWidth = section / this.options.caseLimit - this.options.spaceSection * 2;

            $(this.elem).find('.slider__swither').width(section);

            $(this.elem).find('.swither__item')
                            .css({
                                    'width':contentWidth + this.options.spaceSection * 2,
                                    'padding-left': this.options.spaceSection,
                                    'padding-right': this.options.spaceSection
                                })
                                .each(function() {
                                    totalWidth = totalWidth + $(this).outerWidth(true);
                                });;

            this.options.category === 'false'
                ? $(this.elem).find('.category').hide()
                : totalHeigt += $(this.elem).find('.category').outerHeight();


            totalHeigt += $(this.elem).find('.slider__wrapper p').outerHeight();

            maxScrollPosition = totalWidth - $(this.elem).find(".slider__swither").outerWidth();
            switcher = $(this.elem).find(".slider__wrapper");

            switcher.width(totalWidth + 20);

            $(this.elem).find(".swither__item:first").addClass("swither__item--edge");

            if (this.options.autoHeight === 'true') {
                console.log('true');
                $(this.elem).find('.swither__item').height(contentWidth);
                $(this.elem).find('.slider__swither').height(totalHeigt + contentWidth);
                $(this.elem).height(totalHeigt + contentWidth + 40);
            } else {
                $(this.elem).find('.swither__item').height(this.options.autoHeight);
            };

        },

        toGalleryItem:  function ($targetItem) {

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
    };

    $.fn.sliderGoods = function( options ) {
        return this.each(function() {
            
            var slider = Object.create( Slider );
            slider.init( options, this);
        });
    };   

    $.fn.sliderGoods.options = {
        caseLimit: 4, //кол-во товаров в витрине
        butPosition: 'bottom', // позиция кнопок
        autoHeight: 'false', // высота всего слайдера
        desc: 'true', // описание под изображением
        category: 'true', //показ категорий
        spaceSection: 15 //расстояние между секциями
    };

    $('[name="phone"]').inputmask("mask", {
        mask: "+9[9](999)99-9999[9]",
        skipOptionalPartCharacter: " ",
        showMaskOnHover: false,
        autoUnmask: true
    });


})( jQuery, window, document );




$(window).ready(function() {

    // 'use strict';

    // var totalWidth = 0;

    


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
// ===============================lists========================================


(function(){


var menuCell = $('.widget__list>li>ul'),
    menuButton = $('.widget__item>a');

menuCell
        .addClass('nav-list')
            .hide()
                .children('li')
                    .show();

menuButton.on('click', function(e){
    e.preventDefault();

    $(this).parent().hasClass('open')
        ? $(this).parent().removeClass('open').children('ul').slideUp(200)
        : $(this).parent().addClass('open').children('ul').slideDown(200);

});

})();

// if ($(window).width() <= 768) {
        
//         menuButton.on('mouseenter', function() {
//             var $this = $(this);

//             timeoutId = setTimeout(function () {
//                 $this
//                     .children('ul')
//                         .slideDown(250)
//             },500)
//         });

//         menuButton.on('mouseleave', function() {
            
//             clearTimeout(timeoutId);

//             $(this).children('ul').slideUp(400);
//         });

// }else{

//     menuButton.hover(function() {
//         $(this).children('ul').slideDown(100);
//         },
//         function() {
//             $(this).children('ul').slideUp(100);
//         }


    /* =========================== SWITCHER-CAROUSEL =========================== */  



    // $('div.slider').find(".swither__item").each(function() {
    //     totalWidth = totalWidth + $(this).outerWidth(true);
    // });

    // var maxScrollPosition = totalWidth - $('div.slider').find(".slider__swither").outerWidth(),
    // switcher = $('div.slider').find(".slider__wrapper");

    //     function toGalleryItem($targetItem) {

    //         console.log($targetItem);

    //         if($targetItem.length) {

    //             var newPosition = $targetItem.position().left;

    //             if(newPosition <= maxScrollPosition) {

    //                 $targetItem.addClass("swither__item--edge");
    //                 $targetItem.siblings().removeClass("swither__item--edge");

    //                 switcher.animate({
    //                     left : - newPosition
    //                 });
    //             } else {
    //                 switcher.animate({
    //                     left : - maxScrollPosition
    //                 });
    //             }
    //         }
    //     }

    //     switcher.width(totalWidth);

    //     $('div.slider').find(".swither__item:first").addClass("swither__item--edge");

    //     $('div.slider').find(".nav--prev").on('click', function(e) {
    //         e.preventDefault();
    //         var $targetItem = $('div.slider').find(".swither__item--edge").prev();
    //         console.log($targetItem);
    //         toGalleryItem($targetItem);
    //     });

    //     $('div.slider').find(".nav--next").on('click', function(e) {
    //         e.preventDefault();
    //         var $targetItem = $('div.slider').find(".swither__item--edge").next();
    //         console.log($targetItem);
    //         toGalleryItem($targetItem);
    //     });

 // ============================================       



});




