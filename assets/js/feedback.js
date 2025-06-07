document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackMessage = document.getElementById("feedback-message");

    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (validateForm(name, email, message)) {
            // Simulate form submission
            feedbackMessage.textContent = "感谢您的反馈！我们会尽快回复您。";
            feedbackMessage.style.color = "green";
            feedbackForm.reset();
        } else {
            feedbackMessage.textContent = "请填写所有字段并确保电子邮件格式正确。";
            feedbackMessage.style.color = "red";
        }
    });

    function validateForm(name, email, message) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return name && emailPattern.test(email) && message;
    }
});