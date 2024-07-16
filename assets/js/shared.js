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
            if (menu.classList.contains("active")) {
                menu.classList.remove("active");
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

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkTheme);
window.addEventListener('resize', checkWindowSize);

document.addEventListener('DOMContentLoaded', function() {
    checkTheme();
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