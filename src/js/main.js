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
        var className = ".drop-down, .menu__pointer, .currency__btn, .language__btn";

        if (!$(e.target).closest(className).length) {
            $(".drop-down").fadeOut(300);
        }
    });

    /* GET COOKIE VALUE */
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
    $(".language__drop-item").on("click", function(e) {
        var btnAttr = $(this).attr("data-language-btn");

        $(".language__btn").attr("data-language", btnAttr);
        $(this).closest(".drop-down").fadeOut(300);
    });


    /* CURRENCY */
    $(".currency__drop-item").on("click", function(e) {
        var btnAttr = $(this).attr("data-currency-btn");

        $(".currency__name").html(btnAttr);
        $(this).closest(".drop-down").fadeOut(300);
    });
});


