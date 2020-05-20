
function printResume() {
    console.log("printing")
    //Wait until PDF is ready to print    
    // if (typeof document.getElementById("printable-resume").print == 'undefined') {
    //     setTimeout(function(){printResume();}, 1000);
    // } else {
        var x = document.getElementById("resume-frame");
        console.log(x)
        x.contentWindow.focus();
        x.contentWindow.print();
    // }
}

function copyResume() {
    $("#copy-url-holder").attr("value", "http://" + document.URL.split('/')[2] + '/resume')
    var copyText = document.getElementById("copy-url-holder");
    copyText.select();
    document.execCommand("copy");
    copyText.blur()
}