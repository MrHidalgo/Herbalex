function setCookieStore(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ( (expires)  ? "; expires="  + expires   : "" ) +
        ( (path)     ? "; path="     + path      : "" ) +
        ( (domain)   ? "; domain="   + domain    : "" ) +
        ( (secure)   ? "; secure"                : "" );
}


function getCookieStore(cookieName) {
    var results = document.cookie.match( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );

    if (results) {
        return (unescape(results[2]));
    } else {
        return null;
    }
}


function languageInit(str) {

    $("[data-id]").each(function(ind, val) {

        var dataVal = $(val).attr("data-id");

        if(lang[str][dataVal] === "" || lang[str][dataVal] === undefined) {
            $(val).html(lang.en[dataVal]);
        } else {
            $(val).html(lang[str][dataVal]);
        }
    });
}


function appendDOMItem(wMenuWrap, cMenuItem, wContainer) {
    if((wMenuWrap + cMenuItem) >= wContainer) {

        var lastElementMenu = $(".header .menu > .menu__btn").last();

        $(".menu__drop").prepend(lastElementMenu);
    } else {
        return false;
    }
}


function checkMenuDesktop(widthContainer) {
    var countMenuItem = $(".header .menu > *").length;

    for(var i = 0; i < countMenuItem; i++) {
        var widthMenuWrap = $(".header .menu").width();

        appendDOMItem(widthMenuWrap, countMenuItem, widthContainer);
    }
}


function checkMenuMobile(widthContainer) {
    var countMenuItem = $(".header .menu > *").length;

    for(var i = 0; i < countMenuItem; i++) {
        var widthMenuWrap = 0;

        $(".header .menu > a").each(function(ind, val) {
            widthMenuWrap += $(val).outerWidth(true);
        });

        appendDOMItem(widthMenuWrap, countMenuItem, widthContainer);
    }
}


function less(nWords, className) {

    $(className).each(function(ind, val) {
        var lessText = $(this).text().substring(0, nWords).trim();

        $(this).html(lessText + "... ");
    });
}


/* MENU ELEMENTS SHOW/HIDE*/
$(window).on("load resize ready scroll", function(){
    var firstCheck          = ($(window).width() > '990' && $(window).width() < '1200'),
        secondCheck         = ($(window).width() > '300' && $(window).width() < '768'),
        widthContainerAll   = $(".container").width(),
        widthContainerHalf  = widthContainerAll / 2;

    if(firstCheck) {
        checkMenuDesktop(widthContainerHalf);
    }
    else if (secondCheck) {
        checkMenuMobile(widthContainerAll);
    } else {
        var dropItem = $(".menu__drop .menu__btn");

        $(".menu__pointer").before(dropItem);
        $(".menu__drop").hide();
    }
});

/* TEST */
$(window).load(function() {
    $(".menu").css({
            "opacity" : "1"
    });
});


$(document).ready(function() {


    /* LESS TEXT DESCRIPTION IN */
    less(150, ".search__drop-product--desc__text");


    /* BODY CLICK */
    $('body').on('click', function (e) {
        var className = ".drop-down, .menu__pointer, .currency__btn, " +
            ".language__btn, .btn-category-js, .nav__drop, .coupon, .cart, " +
            ".search, .slider__right";

        if (!$(e.target).closest(className).length) {
            $(".slider__info-body, .search__drop, .drop-down, .cart__drop").fadeOut(300);
            $(".search, .nav__drop, .btn-category-js").removeClass("active");
            $(".coupon__wrap").removeClass("enter done error");
            $(".search__btn").removeClass("close");
            $(".slider__info-face").fadeIn(500);
        }
    });


    /* GET COOKIE VALUE LANG */
    var getCookieValue  = getCookieStore("LANG");

    if(getCookieValue !== null)
        languageInit(getCookieValue);


    /* LANG BTN FOR TRANSLATE */
    $(".lang__btn").on("click", "a", function(e) {
        e.preventDefault();
        var linkData = $(this).attr("data-lang");

        window.location.reload();

        setCookieStore("LANG", linkData);

        languageInit(linkData);
    });


    /* ITEM BTN WITH DROP DOWN BLOCK */
    $(".menu__pointer, .currency__btn, .language__btn").on("click", function(e) {
        e.preventDefault();

        var dropDownBlock = $(".drop-down");

        $(".nav__drop, .search, .btn-category-js").removeClass("active");
        $(".coupon__wrap").removeClass("enter done error");
        $(".search__drop, .cart__drop").fadeOut(300);

        if($(this).siblings(".drop-down").is(":visible")) {
            dropDownBlock.fadeOut(300);
        } else {
            dropDownBlock.fadeOut(300);
            $(this).siblings(".drop-down").fadeToggle(300);
        }
    });


    /* LANGUAGE */
    $(".language__drop-item").on("click", function() {
        var btnAttr = $(this).attr("data-language-btn");

        $(".language__btn").attr("data-language", btnAttr);
        $(".language__drop-item").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".drop-down").fadeOut(300);
    });


    /* CURRENCY */
    $(".currency__drop-item").on("click", function() {
        var btnAttr = $(this).attr("data-currency-btn");

        $(".currency__name").html(btnAttr);
        $(".currency__drop-item").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".drop-down").fadeOut(300);
    });


    /* COUPON */
    $(".coupon__row").on("click", function() {
        $(".coupon__wrap").addClass("enter");

        $(".search__drop, .drop-down, .cart__drop").fadeOut(300);
        $(".search, .nav__drop, .btn-category-js").removeClass("active");
    });
    $(".coupon-enter-js").on("click", function() {
        var inputCouponValue = $(".coupon__wrap-input").val();

        if(inputCouponValue !== "12345") {
            $(".coupon__wrap").removeClass("enter").addClass("error");
        } else {
            $(".coupon__wrap").removeClass("enter").addClass("done");
        }
    });
    $(".coupon-error-js").on("click", function() {
        $(".coupon__wrap").removeClass("error").addClass("enter");
    });
    $(".coupon-done-js").on("click", function() {
        $(".coupon__wrap").hide().removeClass("done");
        $(".coupon__row-info, .coupon__row-done").toggle();
        setCookieStore("DISCOUNT", "done");
    });
    var getCookieDiscount = getCookieStore("DISCOUNT");

    if(getCookieDiscount === "done")
        $(".coupon__row-info, .coupon__row-done").toggle();


    /* CATEGORY */
    $(".btn-category-js").on("click", function() {
        $(this).toggleClass("active");
        $(".nav__drop").toggleClass("active");

        $(".search").removeClass("active");
        $(".search__drop, .drop-down, .cart__drop").fadeOut(300);
        $(".coupon__wrap").removeClass("enter done error");
    });
    $(".category-name-js").on("click", function() {
        var dataAttrBtn = $(this).attr("data-num");

        $(".nav__drop-center-wrap").hide();
        $(".nav__drop-center-" + dataAttrBtn).show();
    });


    /* CART */
    $(".cart__row").on("click", function() {
        $(".cart__drop").fadeToggle(300);

        $(".search__drop, .drop-down").fadeOut(300);
        $(".search, .nav__drop, .btn-category-js").removeClass("active");
        $(".coupon__wrap").removeClass("enter done error");
    });


    /* SEARCH */
    $(".search__btn").on("click", function() {
        $(this).toggleClass("close");
        $(".search").toggleClass("active");
        $(".search__drop").fadeToggle(300);

        $(".cart__drop, .drop-down").fadeOut(300);
        $(".nav__drop, .btn-category-js").removeClass("active");
        $(".coupon__wrap").removeClass("enter done error");
    });


    /* SLIDER INFO */
    $(".slider__info-face").on("click", function () {
       $(this).fadeOut(300);
       $(".slider__info-body").fadeIn(500);
    });


    /* REVIEW */
    $(".review__btn").on("click", function() {
        $(".review__btn").removeClass("active");
        $(this).addClass("active");
    });
});