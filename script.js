// Native <details> provides a working menu even when JavaScript is unavailable.
const menu = document.querySelector(".mobile-menu");

if (menu) {
    const trigger = menu.querySelector("summary");
    const desktop = window.matchMedia("(min-width: 768px)");

    menu.addEventListener("click", (event) => {
        if (event.target.closest("a[href^='#']")) {
            menu.open = false;
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.open) {
            menu.open = false;
            trigger.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (menu.open && !menu.contains(event.target)) {
            menu.open = false;
        }
    });

    desktop.addEventListener("change", (event) => {
        if (event.matches) {
            const focusWasInMenu = menu.contains(document.activeElement);
            menu.open = false;
            if (focusWasInMenu) {
                document.querySelector(".desktop-nav a").focus();
            }
        } else if (document.querySelector(".desktop-nav").contains(document.activeElement)) {
            trigger.focus();
        }
    });
}
