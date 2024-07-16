let title = "";
let id= "";

document.addEventListener('DOMContentLoaded', function() {
    if(urlParams.has("id")) {
        document.getElementById("article-title").value = urlParams.get("id");
    }
    if(document.getElementById("article-title").value) {
        setTitle();
    }
});

function setTitle() {
    title = document.getElementById("article-title").value;
    if(title) {
        id = title.replaceAll(" ", "-").replace(/[^a-z0-9-_]/gi, '').toLowerCase();
        document.querySelector("iframe").src = "../templates/editor.html?back=reload&id="+id;
    }
}