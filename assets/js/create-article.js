document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("id")) {
        document.querySelector("iframe").src = "../templates/editor.html?id="+urlParams.get("id");
    }
});