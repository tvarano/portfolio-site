
function printResume() {
    console.log("printing")
    //Wait until PDF is ready to print    
    // if (typeof document.getElementById("printable-resume").print == 'undefined') {
    //     setTimeout(function(){printResume();}, 1000);
    // } else {
        var x = document.getElementById("resume-frame");
        x.contentWindow.focus();
        x.contentWindow.print();
    // }
}

function copyResume() {
    copy_url("/resume")
    $("#copy-button").html("Copied!").focusout(function() {
        this.innerHTML = "Copy Link";
    });
}