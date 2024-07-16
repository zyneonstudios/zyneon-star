function setArticleAuthor(newAuthor) {
    const author = document.getElementById("article-author");
    author.innerText = newAuthor;
}

function setArticleBackgroundUrl(newBackgroundUrl) {
    const background = document.getElementById("header");
    background.style.background = "linear-gradient(to top, var(--background), transparent), url('"+newBackgroundUrl+"') no-repeat center";
}

function setArticleButtons(newButtons) {
    const buttons = document.getElementById("article-buttons");
    buttons.innerHTML = "<h6><a class=\"button\" href=\"..\"><i class='bx bx-left-arrow-alt'></i><span class=\".back\">Back</span></a></h6>"+newButtons;
}

function setArticleDatePublished(newDate) {
    const datePublished = document.getElementById("article-published");
    datePublished.innerText = newDate;
}

function setArticleMarkdown(newMarkdown) {
    const markdown = document.getElementById("article");
    markdown.innerHTML = "<md-block id='article-markdown'>"+newMarkdown+"</md-block>";
}

function setArticleTitle(newTitle) {
    const title = document.getElementById("article-title");
    title.innerText = newTitle;
}

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    if (lang === "de") {
        document.querySelector(".by").innerText = "von";
        document.querySelector(".published").innerText = "vom";
        document.querySelector(".back").innerText = "Zurück";
    }
}