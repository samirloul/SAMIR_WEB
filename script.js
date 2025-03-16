document.addEventListener("DOMContentLoaded", function() {
    let toggleSwitch = document.getElementById("modeSwitch");
    let brevoForm = document.querySelector(".sib-form"); // Selecteer Brevo-formulier

    // Controleer de opgeslagen modus en pas het formulier aan
    function updateFormMode() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            brevoForm.style.backgroundColor = "#222"; // Donkere achtergrond
            brevoForm.style.color = "white"; // Witte tekst
            toggleSwitch.checked = true;
        } else {
            document.body.classList.remove("dark-mode");
            brevoForm.style.backgroundColor = "white"; // Witte achtergrond
            brevoForm.style.color = "black"; // Zwarte tekst
        }
    }

    // Direct updaten bij het laden van de pagina
    updateFormMode();

    // Schakel modus wanneer op de knop wordt gedrukt
    toggleSwitch.addEventListener("change", function() {
        if (this.checked) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
        updateFormMode();
    });
});
