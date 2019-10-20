$(document).ready(function(){
    $('.carousel__inner').slick({
        adaptiveHeight: true,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true,
                    dotsClass: 'carousel__dots' 
                 }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide (item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__more').eq(i).toggleClass('catalog-item__more_active');
            })
        });
    };
    toggleSlide('.catalog-item__link_back')
    toggleSlide('.catalog-item__link')

    // modals

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay,#consultation').fadeIn()
    });
    $('.modal__close').on('click', function(){
        $('.overlay,#consultation,#order,#thanks').fadeOut()
    });
    
    $('.button_catalog').each(function(i){
        $(this).on('click',function(){
            $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text())
            $('.overlay,#order').fadeIn()
        });
    });

    // validation

    function validateForms(form){
        $(form).validate({
            rules: {
                    name: 'required',
                phone:"required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                    name: 'Пожалуйста, введите свое имя',
                phone:"Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Некорректный почтовый адресс",
            }
        }
        });
    };
    validateForms("#call");
    validateForms("#consultation form");
    validateForms("#order form");

    // mask
    $('input[name=phone]').mask("+7 (999) - 999-99-99");

    // forms

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '../mailer/smart.php',
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });

    //scroll and pageup
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1500) {
            $('.page_up').fadeIn('slow');
        } else {
            $('.page_up').fadeOut('slow');
        }
    });

    $(function(){
        $("a[href^='#']").click(function(){
                var _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
    });
    new WOW().init()
  });