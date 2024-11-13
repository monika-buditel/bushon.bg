document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("responseMessage");

    if (name && email && message) {
        responseMessage.textContent = "Thank you for reaching out, " + name + "! We will get back to you soon.";
        responseMessage.style.color = "#28a745";
        this.reset();
    } else {
        responseMessage.textContent = "Please fill out all fields.";
        responseMessage.style.color = "red";
    }
});
