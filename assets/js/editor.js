const urlParams = new URLSearchParams(window.location.search)
let id = generateUUIDv4();
let back = "..";
let editor;
let fullscreen = false;

if(urlParams.has("id")) {
    id = urlParams.get("id");
}

function initEditor() {
    document.getElementById("md-editor").id = "editor_"+id;
    editor = new SimpleMDE(
        {
            autoDownloadFontAwesome: true,
            autofocus: true,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: id+"",
            },
            blockStyles: {
                bold: "**",
                code: "```",
                italic: "*"
            },
            element: document.getElementById("editor_"+id),
            forceSync: true,
            hideIcons: [
                "guide"
            ],
            indentWithTabs: true,
            tabSize: 4,
            spellChecker: false,
            promptUrls: true
        }
    );

    let fullscreen = false;
    if(urlParams.has("fullscreen")) {
        if(urlParams.get("fullscreen")==="true") {
            fullscreen = true;
        }
    }
    if(localStorage.getItem("editor.fullscreen")!==null) {
        if(localStorage.getItem("editor.fullscreen")==="true") {
            fullscreen = true;
        }
    }
    if(fullscreen) {
        editor.toggleFullScreen();
    }
}

function replaceBack() {
    back = location.href;
    if(back.includes("?")) {
        back = back + "&id="+id;
    } else {
        back = back + "?id="+id;
    }
    const a = document.querySelector("#exit").querySelector("a");
    a.innerHTML = "<i class='bx bx-refresh'></i>";
    if(a.classList.contains("red")) {
        a.classList.remove("red");
    }
    if(!a.classList.contains("blue")) {
        a.classList.add("blue");
    }
}

document.addEventListener('DOMContentLoaded', function() {

    if(urlParams.get("back")!=null) {
        back = urlParams.get("back");
        if(back==="reload") {
            replaceBack();
        }
    }
    if(isApp()) {
        replaceBack();
        if(id==="settings") {
            console.log("[CONNECTOR] star.init.editor")
        }
    }

    setInterval(function() {
        checkForLinks();
        if(editor.isFullscreenActive()!==fullscreen) {
            const a = document.getElementById("exit").querySelector("a");
            const r = document.getElementById("r");
            const l = document.getElementById("l");
            if(editor.isFullscreenActive()) {
                fullscreen = true;
                if(!a.classList.contains("active")) {
                    a.classList.add("active");
                }
                if(!l.classList.contains("active")) {
                    l.classList.add("active");
                }
                if(!r.classList.contains("active")) {
                    r.classList.add("active");
                }
            } else {
                fullscreen = false;
                if(a.classList.contains("active")) {
                    a.classList.remove("active");
                }
                if(l.classList.contains("active")) {
                    l.classList.remove("active");
                }
                if(r.classList.contains("active")) {
                    r.classList.remove("active");
                }
            }
            localStorage.setItem("editor.fullscreen",fullscreen)
        }
    }, 250);
});

document.addEventListener("keydown", function(event) {
    checkForLinks();
});

function checkForLinks() {
    const links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        if(links[i].href) {
            if(!links[i].href.startsWith("javascript:")) {
                links[i].href = "javascript:editorRedirect('"+links[i].href+"');";
            }
        }
    }
}

function editorRedirect(goal) {
    if(isApp()) {
        console.log("[CONNECTOR] star.browse."+goal)
    } else {
        window.open(goal, "_blank");
    }
}