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

// The table is the source for both chart views and works on its own.
const comparison = document.querySelector(".error-comparison");

if (comparison) {
    const picker = comparison.querySelector(".test-picker");
    const errors = Array.from(comparison.querySelectorAll(".results-table td"), (cell) => ({
        cell,
        value: Number.parseFloat(cell.textContent)
    }));
    const maximum = Math.max(...errors.map(({ value }) => value));

    if (Number.isFinite(maximum)) {
        const scale = Math.max(5, Math.ceil(maximum / 5) * 5);
        comparison.querySelector(".chart-scale").textContent = `Bars use a shared 0–${scale}% scale.`;

        for (const { cell, value } of errors) {
            cell.style.setProperty("--error-width", `${100 * value / scale}%`);
        }

        function selectTestSet() {
            comparison.dataset.view = picker.querySelector(":checked").value;
        }

        picker.addEventListener("change", selectTestSet);
        selectTestSet();
        picker.hidden = false;
    }
}
