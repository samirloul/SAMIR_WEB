document.addEventListener("DOMContentLoaded", function() {
    let toggleSwitch = document.getElementById("modeSwitch");
    let brevoForm = document.querySelector(".sib-form");

    function updateMode() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
            toggleSwitch.checked = true;
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
            toggleSwitch.checked = false;
        }
    }

    updateMode();

    toggleSwitch.addEventListener("change", function() {
        if (this.checked) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
        updateMode();
    });
});
