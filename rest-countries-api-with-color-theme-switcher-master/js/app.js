const darkModeBtn = document.querySelector("header > a");

if (JSON.parse(localStorage.getItem("darkMode")) == true) {
    darkModeBtn.classList.add("dark");
    toggleDarkMode();
}

darkModeBtn.addEventListener("click", (e) => {
    darkModeBtn.classList.toggle("dark");
    toggleDarkMode();
});

function toggleDarkMode() {
    if (darkModeBtn.classList.contains("dark")) {
        document.documentElement.style.setProperty(
            "--bg-color",
            "hsl(207, 26%, 17%)"
        );
        document.documentElement.style.setProperty(
            "--bg-color-2",
            "hsl(209, 23%, 22%)"
        );
        document.documentElement.style.setProperty(
            "--text-color",
            "hsl(0, 0%, 100%)"
        );
        localStorage.setItem("darkMode", true);
    } else {
        document.documentElement.style.setProperty(
            "--bg-color",
            "hsl(0, 0%, 98%)"
        );
        document.documentElement.style.setProperty(
            "--bg-color-2",
            "hsl(0, 0%, 100%)"
        );
        document.documentElement.style.setProperty(
            "--text-color",
            "hsl(200, 15%, 8%)"
        );
        localStorage.setItem("darkMode", false);
    }
}
