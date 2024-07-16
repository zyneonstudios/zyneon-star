let id = generateUUIDv4();
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("id")) {
        id = urlParams.get("id");
    }
    document.getElementById("md-editor").id = "editor_"+id;

    new SimpleMDE(
        {
            autoDownloadFontAwesome: true,
            autofocus: true,
            autosave: {
                enabled: true,
                delay: 10000,
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
});