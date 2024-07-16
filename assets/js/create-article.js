let title = "";
let id= "";

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("id")) {
        document.querySelector("iframe").src = "../templates/editor.html?id="+urlParams.get("id");
    }
});

function setTitle() {
    title = document.getElementById("article-title").value;
    if(title) {
        id = title.replaceAll(" ", "-").replace(/[^a-z0-9-_]/gi, '').toLowerCase();
        document.querySelector("iframe").src = "../templates/editor.html?id="+id;
    }
}