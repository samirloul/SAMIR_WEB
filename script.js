document.addEventListener("DOMContentLoaded", function() {
    let toggleSwitch = document.getElementById("modeSwitch");

    // Controleer de opgeslagen modus
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    // Schakel modus wanneer op de knop wordt gedrukt
    toggleSwitch.addEventListener("change", function() {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });
});
