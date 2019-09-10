
function copyResume() {
    $("#copy-url-holder").attr("value", "http://" + document.URL.split('/')[2] + '/resume')
    var copyText = document.getElementById("copy-url-holder");
    copyText.select();
    document.execCommand("copy");
    copyText.blur()
    $("#res-copy")[0].innerHTML="<p class='active'>Copied!</p>"
}

function copyCard() {
    $("#copy-url-holder").attr("value", "http://" + document.URL.split('/')[2] + '/static/src/business-card.pdf')
    var copyText = document.getElementById("copy-url-holder");
    copyText.select();
    document.execCommand("copy");
    copyText.blur()
    $("#card-copy")[0].innerHTML="<p class='active'>Copied!</p>"
}


function openDoc(target) {
    target.classList.add("active")
    var query = $("#" + target.id)
    query.find(".doc-separator")[0].classList.add("active")
    query.find(".button-holder").each(function() {
        this.classList.add("active")
    })
    setTimeout(function() {
        query.find("button").each(function() {
            this.classList.add("active")
        })
        setTimeout(function() {
            query.find('.doc-button > p').each(function() {
                this.classList.add("active")
            })
        }, 100)
    }, 200)
}

function closeDoc(target) {
    target.classList.remove("active")
    var query = $("#" + target.id)
    query.find("button").each(function() {
        this.classList.remove("active")
        query.find(".doc-button.right")[0].innerHTML = "<p>Open</p>"
        query.find(".doc-button.left")[0].innerHTML="<p>Copy Link</p>"
    })
    setTimeout(function() {
        query.find(".doc-separator")[0].classList.remove("active")
        query.find(".button-holder").each(function() {
            this.classList.remove("active")
        })
    }, 200)
}

function closeDocs() {
    $(".doc").each(function() {
        closeDoc(this)
    })
}

// check clicks
$(function() {
    $("body").click(function(e) {
        console.log(e.target)

/* if its a doc, or if its parent is a doc {
    if (it is open) close it
    else if it is closed open it
    
} else close all
*/

        if (e.target.classList.contains("doc") || $(e.target).parents(".doc").length) {
            var target = (e.target.classList.contains("doc") ? e.target : $(e.target).parents(".doc")[0])
            if (target.classList.contains("active"))
                closeDoc(target)
            else 
                openDoc(target)
        } else {
            closeDocs()
        }
    });
})