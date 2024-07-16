function setArticle(author,backgroundUrl,buttons,datePublished,markdown,title) {
    if(author) {
        setArticleAuthor(author);
    }
    if(backgroundUrl) {
        setArticleBackgroundUrl(backgroundUrl);
    }
    if(buttons) {
        setArticleButtons(buttons);
    }
    if(datePublished) {
        setArticleDatePublished(datePublished);
    }
    if(markdown) {
        setArticleMarkdown(markdown);
    }
    if(title) {
        setArticleTitle(title);
    }
}

function setArticleAuthor(newAuthor) {
    if(newAuthor) {
        const author = document.getElementById("article-author");
        author.innerText = newAuthor;
    }
}

function setArticleBackgroundUrl(newBackgroundUrl) {
    if(newBackgroundUrl) {
        const background = document.getElementById("header");
        background.style.background = "linear-gradient(to top, var(--background), transparent), url('"+newBackgroundUrl+"') no-repeat center";
    }
}

function setArticleButtons(newButtons) {
    if(newButtons) {
        const buttons = document.getElementById("article-buttons");
        buttons.innerHTML = "<h6><a class=\"button\" href=\"..\"><i class='bx bx-left-arrow-alt'></i><span class=\".back\">Back</span></a></h6>"+newButtons;
    }
}

function setArticleDatePublished(newDate) {
    if(newDate) {
        const datePublished = document.getElementById("article-published");
        datePublished.innerText = newDate;
    }
}

function setArticleMarkdown(newMarkdown) {
    if(newMarkdown) {
        const markdown = document.getElementById("article");
        markdown.innerHTML = "<md-block id='article-markdown'>"+newMarkdown+"</md-block>";
    }
}

function setArticleTitle(newTitle) {
    if(newTitle) {
        const title = document.getElementById("article-title");
        title.innerText = newTitle;
    }
}

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    if (lang === "de") {
        document.querySelector(".by").innerText = "von";
        document.querySelector(".published").innerText = "vom";
        document.querySelector(".back").innerText = "Zurück";
    }
}