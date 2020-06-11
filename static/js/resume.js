
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
    $.ajax({
        url:'/copy-resume',
        type:'get',
        success:function(){
            $("#copy-button").html("Copied!").focusout(function() {
                this.innerHTML = "Copy Link";
            });
        }
    });
}