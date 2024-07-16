let lang;

function checkTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("theme")) {
        setTheme(urlParams.get("theme"),true);
        return;
    } else if(localStorage.getItem("options.theme")!==null) {
        setTheme(localStorage.getItem("options.theme"));
        return;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme(true);
        return;
    }
    setTheme(false);
}

function setTheme(newTheme,save) {
    if(newTheme==="dark"||newTheme==="true"||newTheme===true) {
        newTheme = "../assets/css/colors-dark.css";
    } else if(newTheme==="light"||newTheme==="false"||newTheme===false||newTheme===null||newTheme===undefined) {
        newTheme = "../assets/css/colors-light.css";
    }
    document.getElementById("css-colors").href = newTheme;
    if(save) {
        if(save===true) {
            localStorage.setItem("options.theme",newTheme);
        }
    }
}

function toggleTheme(save) {
    let theme = document.getElementById("css-colors").href;
    if(theme.includes("-dark.css")) {
        theme = theme.replaceAll("-dark.css","-light.css");
    } else {
        theme = theme.replaceAll("-light.css","-dark.css");
    }
    let saveTheme = false;
    if(save) {
        if(save===true) {
            saveTheme = true;
        }
    }
    setTheme(theme,saveTheme)
}

let mobile = false;
function isMobileDevice() {
    const userAgent = navigator.userAgent;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isMobileMQ = window.matchMedia("(max-width: 767px)").matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return isMobileUA || isMobileMQ || isTouch;
}

function widthToSmall() {
    if(window.innerWidth < 768) {
        return true;
    }
}

let lock = false;
function checkWindowSize() {
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
    const menu = document.getElementById("menu");
    if(!lock) {
        if (mobile || widthToSmall()) {
            if (mobile) {
                lock = true;
            }
            if (!menu.classList.contains("active")) {
                menu.classList.add("active");
            }
        } else {
            if(menu) {
                if (menu.classList.contains("active")) {
                    menu.classList.remove("active");
                }
            }
        }
    }
}

function toggleMenu() {
    const entries = document.getElementById("menu-entries");
    const toggle = document.getElementById("menu-toggle");
    if(entries.classList.contains("active")) {
        entries.classList.remove("active");
        toggle.className = "bx bx-menu";
    } else {
        entries.classList.add("active");
        toggle.className = "bx bx-x";
    }
}

function setFooter() {
    const footer = document.getElementById("footer-text");
    if(footer) {
        if (lang === "de") {
            footer.innerHTML = "von <a href=\"https://www.zyneonstudios.com\">Zyneon Studios</a>. Gehosted auf <a href=\"https://github.com/zyneonstudios/zyneon-star\" target=\"_blank\">GitHub</a> und bereitgestellt durch CloudFlare Pages.<br>Lizensiert unter der <a href=\"https://github.com/zyneonstudios/zyneon-star/blob/main/LICENSE.md\" target=\"_blank\">GNU General Public License v3.0</a>. <a onclick='toggleTheme(true);'>Farbschema umschalten</a>.";
            return;
        }
        footer.innerHTML = "by <a href=\"https://www.zyneonstudios.com\">Zyneon Studios</a>. Hosted on <a href=\"https://github.com/zyneonstudios/zyneon-star\" target=\"_blank\">GitHub</a> and provided by CloudFlare Pages.<br>Licensed under <a href=\"https://github.com/zyneonstudios/zyneon-star/blob/main/LICENSE.md\" target=\"_blank\">GNU General Public License v3.0</a>. <a onclick='toggleTheme(true);'>Toggle theme</a>.";
    }
}

function generateUUIDv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkTheme);
window.addEventListener('resize', checkWindowSize);

document.addEventListener('DOMContentLoaded', function() {
    if(location.pathname.includes("/de/")) {
        lang = "de";
    } else if(location.pathname.includes("/en/")) {
        lang = "en";
    } else {
        lang = "en";
        if(localStorage.getItem("settings.language")!=null) {
            lang = localStorage.getItem("settings.language");
        } else {
            const browserLanguage = navigator.language || navigator.userLanguage;
            if(browserLanguage.toLowerCase().startsWith("de")) {
                lang = "de";
            }
        }
    }
    checkTheme(); setFooter();
    mobile = isMobileDevice();
    checkWindowSize();
});

document.addEventListener('contextmenu', function(event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

document.addEventListener('dragstart', function(event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});