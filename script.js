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
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".navbar a");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });
});
function toggleMenu() {
    document.querySelector(".navbar").classList.toggle("active");
}

// Sluit het menu bij klikken op een menu-item (op mobiel)
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const links = document.querySelectorAll(".navbar ul li a");

    links.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                navbar.classList.remove("active"); // Verwijdert de 'active' klasse
            }
        });
    });

    // Sluit het menu ook als je ergens buiten klikt (optioneel)
    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target) && window.innerWidth <= 768) {
            navbar.classList.remove("active");
        }
    });
});
function toggleMenu() {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle("active");
    console.log("Menu toggled!"); // Debugging: Controleer of de functie wordt aangeroepen
}

// Sluit het menu bij klikken op een menu-item (mobiel)
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const menuItems = document.querySelectorAll(".navbar ul li a");

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                navbar.classList.remove("active"); // Sluit het menu
            }
        });
    });
});

