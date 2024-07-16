let id = generateUUIDv4();
let back = "..";
let editor;
let fullscreen = false;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("id")) {
        id = urlParams.get("id");
    }
    if(urlParams.has("back")) {
        back = urlParams.get("back");
        if(back==="reload") {
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
    }
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
            spellChecker: false
        }
    );

    setInterval(function() {
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
        }
    }, 150);
});