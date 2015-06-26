/* jshint devel:true */
'use strict';

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {

    var Slider = {
        init: function (options, elem) {

            var maxScrollPosition, switcher,
                    self = this;
            self.elem = elem;
            self.$elem = $ (elem);

            self.options = $.extend({}, $.fn.sliderGoods.options, options);

            self.calcConst();

            self.$elem.find('.nav--prev').on('click', function (e) {
                e.preventDefault();
                var $targetItem = self.$elem.find('.swither__item--edge').prev();

                self.toGalleryItem($targetItem);
            });

            self.$elem.find('.nav--next').on('click', function (e) {
                e.preventDefault();
                var $targetItem = self.$elem.find('.swither__item--edge').next();

                self.toGalleryItem($targetItem);
            });

        },

        calcConst: function () {
            var self = this,
                totalWidth = 0,
                totalHeigt = 0,
                section = $(self.elem).outerWidth() - 40,
                contentWidth = section / this.options.caseLimit - this.options.spaceSection * 2
                

            self.$elem.find('.slider__swither').width(section);

            self.$elem.find('.swither__item')
                            .css({
                                    width:contentWidth + this.options.spaceSection * 2,
                                    'padding-left': this.options.spaceSection,
                                    'padding-right': this.options.spaceSection
                                })
                                .each(function() {
                                    totalWidth = totalWidth + $(this).outerWidth(true);
                                });

            this.options.category === 'false'
                ? self.$elem.find('.category').hide()
                : totalHeigt += $(this.elem).find('.category').outerHeight();


            totalHeigt += self.$elem.find('.slider__wrapper p').outerHeight();

            self.maxScrollPosition = totalWidth - $(this.elem).find('.slider__swither').outerWidth();
            self.switcher = $(this.elem).find('.slider__wrapper');

            self.switcher.width(totalWidth + 20);

            self.$elem.find('.swither__item:first').addClass('swither__item--edge');

            if (this.options.autoHeight === 'true') {

                self.$elem.find('.swither__item').height(contentWidth);
                self.$elem.find('.slider__swither').height(totalHeigt + contentWidth);
                self.$elem.height(totalHeigt + contentWidth + 40);

            } else {

                self.$elem.find('.swither__item').height(this.options.autoHeight);
            }

        },

        toGalleryItem:  function ($targetItem) {
            var self = this;

            if($targetItem.length) {

                var newPosition = $targetItem.position().left;

                if(newPosition <= self.maxScrollPosition) {

                    $targetItem.addClass('swither__item--edge');
                    $targetItem.siblings().removeClass('swither__item--edge');

                    self.switcher.animate({
                        left : - newPosition
                    });
                } else {
                    self.switcher.animate({
                        left : - self.maxScrollPosition
                    });
                }
            }
        } 
    };

    $.fn.sliderGoods = function (options) {
        return this.each(function() {
            
            var slider = Object.create( Slider );
            slider.init( options, this);
        });
    };   

    $.fn.sliderGoods.options = {
        caseLimit: 4, //кол-во товаров в витрине
        // butPosition: 'bottom', // позиция кнопок
        autoHeight: 'false', // высота всего слайдера
        // desc: 'true', // описание под изображением
        category: 'true', //показ категорий
        spaceSection: 15 //расстояние между секциями
    };

    $('[name="phone"]').inputmask('mask', {
        mask: '+9[9](999)99-9999[9]',
        skipOptionalPartCharacter: ' ',
        showMaskOnHover: false,
        autoUnmask: true
    });

// ================ TABS ==============

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

// =============== end tabs =============

    $('.phone__hide').on('click', function(e) {
        e.preventDefault();

        $(this).replaceWith('<strong class="color--green">093-45-258-55</strong>');

    });

// ================ LIST ================

    $('.widget__list>li>ul')
        .addClass('nav-list')
        .hide()
        .children('li')
        .show();

    $('.widget__item>a').on('click', function(e){
        e.preventDefault();

        $(this).parent().hasClass('open')
        ? $(this).parent().removeClass('open').children('ul').slideUp(200)
        : $(this).parent().addClass('open').children('ul').slideDown(200);

    });

})( jQuery, window, document );