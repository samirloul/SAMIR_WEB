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
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Voorkom herladen van de pagina

    let naam = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let vraag = document.getElementById("question").value;

    let responseMessage = document.getElementById("responseMessage");

    try {
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
        responseMessage.innerText = result.message;
        responseMessage.style.color = "green";

    } catch (error) {
        console.error("Fout bij het verzenden:", error);
        responseMessage.innerText = "Er is iets misgegaan bij het verzenden.";
        responseMessage.style.color = "red";
    }
});
