
function printResume() {
    var x = document.getElementById("resume-frame");
    x.contentWindow.focus();
    x.contentWindow.print();
}

function copyResume() {
    copy("https://github.com/tvarano/resume/raw/master/output/programming/thomas-varano-resume.pdf")
    $("#copy-button").html("Copied!").focusout(function() {
        this.innerHTML = "Copy Link";
    });
}