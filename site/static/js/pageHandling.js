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

// make the body taller to account for the footer
// $("#main-content")[0].style.height = $("#main-content")[0].offsetHeight + $("#main-footer")[0].offsetHeight + "px"

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

//mobile or desktop nav ENSURE DETECTION
/*
try {
    if (!isMob)  {
        $(".doc").each(function() {
            this.classList.add("desktop")
        })
        $("#phone-wrapper")[0].classList.add("desktop")
    } else {
        $("#phone-wrapper")[0].style.marginTop = $(".card-wrapper")[0].getBoundingClientRect().height + 20 + "px"
    }
}
catch(error) {
    console.log("not on contact")
}
*/

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