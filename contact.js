document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('/submit-form', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message;

        // Formulier leegmaken na succesvolle verzending
        if (data.message.includes("verzonden")) {
            document.getElementById('contactForm').reset();
        }
    })
    .catch(() => {
        document.getElementById('responseMessage').innerText = "Er is iets misgegaan, probeer opnieuw.";
    });
});
