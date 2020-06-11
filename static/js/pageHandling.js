// DETECT IF DEVICE IS MOBILE

var isMob = false;
var useMob = screen.width < 850


function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function(query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}
isMob = is_touch_device()

if (isMob) {
    $(".scrollable").each(function() {
        this.classList.add("no-scroll")
    })
    // var list = $(".scrollable")
    // for (var i = 0; i < list.length; i++) {
    //     list[i].classList.add("no-scroll");
    // }
    // document.body.scroll = "no";
}

$("#logo-wrapper" ).click(function() {
    // if on desktop, go to home. 
    if (useMob) {
        if (mobileNavActive)
            deactivateMobileNav()
        else
            activateMobileNav()
    } else {
        window.location.href = "/"
    }
});

// FULL SETUP OF DESKTOP NAV
var minWidth = 700
if (useMob) {
    document.getElementById("desktop-nav").classList.add("hidden")
    activateMobileNav()
    setTimeout(deactivateMobileNav, 1500)
} else {
   document.getElementById("desktop-nav").style.left = document.getElementById("logo-wrapper").getBoundingClientRect().right + 100 + "px"
}

// set active nav button
var page = window.location.pathname.split("/").pop();
var activeDesktopClassList = $("#" + page + "-bundle")[0].classList
activeDesktopClassList.add("active")
activeDesktopClassList.remove("hvr-underline-from-left")
$("#" + page + "-mobile-nav")[0].classList.add("active")

document.body.onscroll = function() {
    if ($(window).scrollTop() == 0)
        $("#main-header")[0].classList.remove("scrolled")
    else 
        $("#main-header")[0].classList.add("scrolled")
};


// go to given address from button
function goTo(button_id) {
    var href = button_id.length == "-nav".length ? "/" : button_id.substr(0, button_id.length - "-nav".length)
    window.location.href=href
}

function goToMob(button_id) {
    var href = button_id.length == "-mobile-nav".length ? "/" : button_id.substr(0, button_id.length - "-mobile-nav".length)
    window.location.href=href
}

function activateMobileNav() {
    $("#logo")[0].classList.add("active")
    $("#mobile-nav")[0].classList.add("active")
    mobileNavActive = true
}

function deactivateMobileNav() {
    $("#logo")[0].classList.remove("active")
    $("#mobile-nav")[0].classList.remove("active")
    mobileNavActive = false
}

function copy_url(suffix) {
    copy(get_hostname(document.URL) + suffix)
}

function get_hostname(url) {
    var m = url.match(/^http:\/\/[^/]+/);
    return m ? m[0] : null;
}

function copy(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(el);
}