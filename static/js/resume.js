
function printResume() {
    var x = document.getElementById("resume-frame");
    x.contentWindow.focus();
    x.contentWindow.print();
}

function copyResume() {
    copy_url("/resume")
    $("#copy-button").html("Copied!").focusout(function() {
        this.innerHTML = "Copy Link";
    });
}