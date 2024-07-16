function checkTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementById("css-colors").href = "../assets/css/colors-dark.css";
        return;
    }
    document.getElementById("css-colors").href = "../assets/css/colors-light.css";
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
    let lang;
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
    const footer = document.getElementById("footer-text");
    if(footer) {
        if (lang === "de") {
            footer.innerHTML = "von <a href=\"https://www.zyneonstudios.com\">Zyneon Studios</a>. Gehosted auf <a href=\"https://github.com/zyneonstudios/zyneon-star\" target=\"_blank\">GitHub</a> und bereitgestellt durch CloudFlare Pages.<br>Lizensiert unter der <a href=\"https://github.com/zyneonstudios/zyneon-star/blob/main/LICENSE.md\" target=\"_blank\">GNU General Public License v3.0</a>.";
            return;
        }
        footer.innerHTML = "by <a href=\"https://www.zyneonstudios.com\">Zyneon Studios</a>. Hosted on <a href=\"https://github.com/zyneonstudios/zyneon-star\" target=\"_blank\">GitHub</a> and provided by CloudFlare Pages.<br>Licensed under <a href=\"https://github.com/zyneonstudios/zyneon-star/blob/main/LICENSE.md\" target=\"_blank\">GNU General Public License v3.0</a>.";
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkTheme);
window.addEventListener('resize', checkWindowSize);

document.addEventListener('DOMContentLoaded', function() {
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