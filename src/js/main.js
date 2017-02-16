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
        var className = ".menu__drop, .menu__pointer";

        if (!$(e.target).closest(className).length) {
            $(".menu__drop").fadeOut(300);
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


    /* MENU POINTER -> AFTER ITEM MENU APPEND IN DROP MENU*/
    $(".menu__pointer").on("click", function(e) {
        e.preventDefault();

        $(".menu__drop").fadeToggle(300);
    });
});


