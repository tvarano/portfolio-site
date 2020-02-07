
function copyResume() {
    copy("http://" + document.URL.split('/')[2] + '/resume');
    $("#res-copy")[0].innerHTML="<p class='active doc-action'>Copied!</p>"
}

function copy(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function copyCard() {
    copy("http://" + document.URL.split('/')[2] + '/static/src/business-card.pdf')
    $("#card-copy")[0].innerHTML="<p class='active doc-action'>Copied!</p>"
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
        query.find(".doc-button.left")[0].innerHTML="<p class='doc-action'>Copy Link</p>"
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
        // console.log(e.target)

/* if its a doc, or if its parent is a doc {
    if (it is open) close it
    else if it is closed open it
    
} else close all
*/
        console.log($(e.target).parents("button").prevObject[0].classList.contains("doc-action"))
        if (e.target.classList.contains("doc") || $(e.target).parents(".doc").length) {
    
    
            var target = (e.target.classList.contains("doc") ? e.target : $(e.target).parents(".doc")[0])
            if (target.classList.contains("active"))
                closeDoc(target)
            else 
                openDoc(target)
        } else {
            if (!($(e.target).parents("button").prevObject[0].classList.contains(".doc-action"))) {
                console.log("DONE.")
                closeDocs()
            }
        }
    });
})