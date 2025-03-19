// Wacht tot de pagina is geladen
document.addEventListener("DOMContentLoaded", function() {
    let toggleSwitch = document.getElementById("modeSwitch");
    let brevoForm = document.querySelector(".sib-form");
    let menuToggle = document.querySelector(".menu-toggle"); // Hamburger knop
    let navbar = document.querySelector(".navbar ul"); // De navigatielijst

    // ✅ Dark mode fix
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

    // ✅ Werkend hamburger menu
    menuToggle.addEventListener("click", function() {
        navbar.classList.toggle("active"); // Menu tonen/verbergen
    });

    // ✅ Sluit menu als je op een link klikt (voor betere UX)
    document.querySelectorAll(".navbar ul li a").forEach(link => {
        link.addEventListener("click", function() {
            navbar.classList.remove("active"); // Menu sluiten na klikken
        });
    });
});

// ✅ Contactformulier versturen via fetch met auto-animatie
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Voorkom herladen van de pagina

    let naam = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let vraag = document.getElementById("question").value;
    let responseMessage = document.getElementById("responseMessage");
    let sendButton = document.querySelector("button[type='submit']");
    let carAnimation = document.getElementById("carAnimation");

    try {
        sendButton.innerHTML = ""; // 🛑 Verwijder tekst uit de knop
        sendButton.disabled = true; // Voorkom meerdere klikken
        carAnimation.style.display = "inline-block"; // 🚗 Toon de auto
        sendButton.appendChild(carAnimation); // 🚗 Plaats de auto in de knop

        let response = await fetch('https://samirweb6-production.up.railway.app/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: naam,
                email: email,
                question: vraag
            })
        });

        let result = await response.json();

        setTimeout(() => {
            sendButton.innerHTML = "Send"; // ✅ Herstel tekst van de knop
            carAnimation.style.display = "none"; // Verberg auto na animatie
            responseMessage.innerText = result.message;
            responseMessage.style.color = "green";
            sendButton.disabled = false; // Knop weer inschakelen
        }, 2500); // 🚗 Wacht tot de auto-animatie klaar is

    } catch (error) {
        console.error("Fout bij het verzenden:", error);
        responseMessage.innerText = "Er is iets misgegaan bij het verzenden.";
        responseMessage.style.color = "red";
    }
});
