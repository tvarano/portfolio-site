
var isMobSize = (screen.width < 850)

/* notify if on ie to use other browser :/ */
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    alert("You are viewing this site using Internet Explorer. This site uses CSS3 variables, and works much better in other browsers. Thank you for understanding.")


function is_touch_enabled() { 
    return ( 'ontouchstart' in window ) ||  
    ( navigator.maxTouchPoints > 0 ) ||  
    ( navigator.msMaxTouchPoints > 0 ); 
} 

if (!isMobSize) {
    $("#mobile-nav").hide()
} else if (is_touch_enabled()) {
    /* if the screeen is around phone size and there is no touch screen, 
    get rid of scrollbars */
    
    $(".scrollable").each(function() {
        this.classList.add("no-scroll")
    })
}

$("#logo-wrapper" ).click(function() {
    // if on desktop, go to home. 
    if (isMobSize) {
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
if (isMobSize) {
    document.getElementById("desktop-nav").classList.add("hidden")
    activateMobileNav()
    setTimeout(deactivateMobileNav, 1500)
} else {
   document.getElementById("desktop-nav").style.left = document.getElementById("logo-wrapper").getBoundingClientRect().right + 100 + "px"
}

// set active nav button
var page = window.location.pathname.split("/").pop();
if ($("#" + page + "-bundle")[0]) {
    var activeDesktopClassList = $("#" + page + "-bundle")[0].classList
    activeDesktopClassList.add("active")
    activeDesktopClassList.remove("hvr-underline-from-left")
    $("#" + page + "-mobile-nav")[0].classList.add("active")
}

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