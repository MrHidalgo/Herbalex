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

        var lastElementMenu = $(".menu > .menu__btn").last();

        $(".menu__drop").prepend(lastElementMenu);
    } else {
        return false;
    }
}


function checkMenuDesktop(widthContainer) {
    var countMenuItem = $(".menu > *").length;

    for(var i = 0; i < countMenuItem; i++) {
        var widthMenuWrap = $(".menu").width();

        appendDOMItem(widthMenuWrap, countMenuItem, widthContainer);
    }
}


function checkMenuMobile(widthContainer) {
    var countMenuItem = $(".menu > *").length;

    for(var i = 0; i < countMenuItem; i++) {
        var widthMenuWrap = 0;

        $(".menu > a").each(function(ind, val) {
            widthMenuWrap += $(val).outerWidth(true);
        });

        appendDOMItem(widthMenuWrap, countMenuItem, widthContainer);
    }
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


    /* BODY CLICK */
    $('body').on('click', function (e) {
        var className = ".drop-down, .menu__pointer, .currency__btn, .language__btn, .btn-category-js, .nav__drop";

        if (!$(e.target).closest(className).length) {
            $(".drop-down").fadeOut(300);
            $(".btn-category-js").removeClass("active");
            $(".nav__drop").hide();
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


    /* DISCOUNT */
    $(".discount__row").on("click", function() {
        $(".discount__coupon").addClass("enter");
    });
    $(".coupon-enter-js").on("click", function() {
        var inputCouponValue = $(".discount__coupon-input").val();

        if(inputCouponValue !== "12345") {
            $(".discount__coupon").removeClass("enter").addClass("error");
        } else {
            $(".discount__coupon").removeClass("enter").addClass("done");
        }
    });
    $(".coupon-error-js").on("click", function() {
        $(".discount__coupon").removeClass("error").addClass("enter");
    });
    $(".coupon-done-js").on("click", function() {
        $(".discount__coupon").hide().removeClass("done");
        $(".discount__row-info, .discount__row-done").toggle();
        setCookieStore("DISCOUNT", "done");
    });
    var getCookieDiscount = getCookieStore("DISCOUNT");

    if(getCookieDiscount === "done")
        $(".discount__row-info, .discount__row-done").toggle();


    /* CATEGORY */
    $(".btn-category-js").on("click", function() {
        $(this).toggleClass("active");
        $(".nav__drop").toggleClass("active");
    });
    $(".category-name-js").on("click", function() {
        var dataAttrBtn = $(this).attr("data-num");

        $(".nav__drop-center-wrap").hide();
        $(".nav__drop-center-" + dataAttrBtn).show();
    });
});