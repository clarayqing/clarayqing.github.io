const themeButton = document.querySelector(".theme-switch");

if (themeButton) {
    const themeKey = "lemonmatcha-theme";
    let dark = false;
    try {
        dark = localStorage.getItem(themeKey) === "dark";
    } catch {
        // The theme can still be changed when storage is unavailable.
    }

    function showTheme() {
        document.documentElement.dataset.theme = dark ? "dark" : "light";
        themeButton.setAttribute("aria-pressed", String(dark));
    }

    themeButton.addEventListener("click", () => {
        dark = !dark;
        showTheme();
        try {
            localStorage.setItem(themeKey, dark ? "dark" : "light");
        } catch {
            // A theme choice lasts for the current page without storage.
        }
    });
    showTheme();
    themeButton.hidden = false;
}

const filters = document.querySelector(".post-filters");

if (filters) {
    const buttons = filters.querySelectorAll("button[data-tag]");
    const cards = document.querySelectorAll(".post-card");
    const counter = document.getElementById("post-count");
    const selected = new Set();

    function updatePosts() {
        for (const button of buttons) {
            const { tag } = button.dataset;
            button.setAttribute("aria-pressed", String(tag ? selected.has(tag) : selected.size === 0));
        }

        let matches = 0;
        for (const card of cards) {
            const tags = card.dataset.tags.split(" ");
            card.hidden = ![...selected].every((tag) => tags.includes(tag));
            if (!card.hidden) matches++;
        }

        counter.textContent = matches === 0 ? "No posts match those tags." : matches + (matches === 1 ? " post" : " posts");
    }

    for (const button of buttons) {
        button.addEventListener("click", () => {
            const { tag } = button.dataset;
            if (!tag) {
                selected.clear();
            } else if (selected.has(tag)) {
                selected.delete(tag);
            } else {
                selected.add(tag);
            }
            updatePosts();
        });
    }

    updatePosts();
    filters.hidden = false;
    counter.hidden = false;
}
